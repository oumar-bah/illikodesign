from email.message import EmailMessage
from fastapi import FastAPI, APIRouter, File, Form, HTTPException, UploadFile
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import smtplib
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

MAX_QUOTE_ATTACHMENTS = 5
MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024


def _require_env(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def _smtp_settings() -> dict:
    return {
        "host": _require_env("SMTP_HOST"),
        "port": int(os.getenv("SMTP_PORT", "587")),
        "username": os.getenv("SMTP_USERNAME", "").strip(),
        "password": os.getenv("SMTP_PASSWORD", "").strip(),
        "sender": _require_env("QUOTE_SENDER_EMAIL"),
        "recipient": _require_env("QUOTE_RECIPIENT_EMAIL"),
        "use_tls": os.getenv("SMTP_USE_TLS", "true").lower() != "false",
    }


def build_quote_email(
    *,
    nom: str,
    entreprise: str,
    telephone: str,
    email: str,
    service: str,
    description: str,
    attachments: List[dict],
) -> EmailMessage:
    settings = _smtp_settings()
    message = EmailMessage()
    message["Subject"] = f"Nouvelle demande de devis — {nom}"
    message["From"] = settings["sender"]
    message["To"] = settings["recipient"]
    message["Reply-To"] = email

    attachment_lines = (
        "\n".join(f"- {attachment['filename']}" for attachment in attachments)
        if attachments
        else "Aucun fichier joint"
    )
    message.set_content(
        "\n".join(
            [
                "Nouvelle demande de devis reçue depuis le site Illiko Design.",
                "",
                f"Nom : {nom}",
                f"Entreprise : {entreprise or 'Non renseignée'}",
                f"Téléphone : {telephone}",
                f"Email : {email}",
                f"Service souhaité : {service}",
                "",
                "Description du projet :",
                description or "Aucune description fournie",
                "",
                "Pièces jointes :",
                attachment_lines,
            ]
        )
    )

    for attachment in attachments:
        content_type = attachment.get("content_type") or "application/octet-stream"
        maintype, _, subtype = content_type.partition("/")
        message.add_attachment(
            attachment["content"],
            maintype=maintype or "application",
            subtype=subtype or "octet-stream",
            filename=attachment["filename"],
        )

    return message


def send_quote_email(**kwargs) -> None:
    settings = _smtp_settings()
    message = build_quote_email(**kwargs)

    if settings["port"] == 465 and settings["use_tls"]:
        with smtplib.SMTP_SSL(settings["host"], settings["port"]) as smtp:
            if settings["username"] and settings["password"]:
                smtp.login(settings["username"], settings["password"])
            smtp.send_message(message)
        return

    with smtplib.SMTP(settings["host"], settings["port"]) as smtp:
        if settings["use_tls"]:
            smtp.starttls()
        if settings["username"] and settings["password"]:
            smtp.login(settings["username"], settings["password"])
        smtp.send_message(message)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


@api_router.post("/quotes")
async def create_quote_request(
    nom: str = Form(...),
    entreprise: str = Form(""),
    telephone: str = Form(...),
    email: EmailStr = Form(...),
    service: str = Form(...),
    description: str = Form(""),
    files: List[UploadFile] = File(default=[]),
):
    if len(files) > MAX_QUOTE_ATTACHMENTS:
        raise HTTPException(
            status_code=400,
            detail=f"Vous pouvez joindre jusqu'à {MAX_QUOTE_ATTACHMENTS} fichiers.",
        )

    attachments = []
    for upload in files:
        if not upload.filename:
            continue

        content = await upload.read()
        if len(content) > MAX_ATTACHMENT_SIZE:
            raise HTTPException(
                status_code=413,
                detail="Chaque fichier doit faire moins de 10 Mo.",
            )

        attachments.append(
            {
                "filename": Path(upload.filename).name,
                "content": content,
                "content_type": upload.content_type or "application/octet-stream",
            }
        )

    try:
        send_quote_email(
            nom=nom.strip(),
            entreprise=entreprise.strip(),
            telephone=telephone.strip(),
            email=str(email).strip(),
            service=service.strip(),
            description=description.strip(),
            attachments=attachments,
        )
    except RuntimeError as exc:
        logger.exception("Quote email configuration error")
        raise HTTPException(
            status_code=500,
            detail="Le service d'envoi n'est pas encore configuré.",
        ) from exc
    except Exception as exc:
        logger.exception("Unable to send quote request email")
        raise HTTPException(
            status_code=502,
            detail="Une erreur est survenue lors de l'envoi de votre demande.",
        ) from exc

    logger.info("Quote request sent for %s (%s)", nom, email)
    return {"message": "Demande envoyée ! Nous vous répondons sous 24h."}


# Include the router in the main app
app.include_router(api_router)