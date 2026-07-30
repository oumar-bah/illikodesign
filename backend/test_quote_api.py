import importlib
import sys
from io import BytesIO

from fastapi.testclient import TestClient


def load_server_module(monkeypatch):
    monkeypatch.setenv("MONGO_URL", "mongodb://localhost:27017")
    monkeypatch.setenv("DB_NAME", "illikodesign_test")
    monkeypatch.setenv("SMTP_HOST", "smtp.test.local")
    monkeypatch.setenv("SMTP_PORT", "587")
    monkeypatch.setenv("SMTP_USE_TLS", "false")
    monkeypatch.setenv("QUOTE_SENDER_EMAIL", "devis@example.com")
    monkeypatch.setenv("QUOTE_RECIPIENT_EMAIL", "owner@example.com")

    sys.modules.pop("server", None)
    return importlib.import_module("server")


def test_create_quote_request_sends_email(monkeypatch):
    server = load_server_module(monkeypatch)
    captured = {}

    def fake_send_quote_email(**kwargs):
        captured.update(kwargs)

    monkeypatch.setattr(server, "send_quote_email", fake_send_quote_email)
    client = TestClient(server.app)

    response = client.post(
        "/api/quotes",
        data={
            "nom": "Awa Diallo",
            "entreprise": "Studio Lumière",
            "telephone": "+224600000000",
            "email": "awa@example.com",
            "service": "Impression grand format",
            "description": "Nous avons besoin d'une enseigne premium.",
        },
        files=[("files", ("brief.txt", BytesIO(b"contenu"), "text/plain"))],
    )

    assert response.status_code == 200
    assert response.json()["message"].startswith("Demande envoyée")
    assert captured["nom"] == "Awa Diallo"
    assert captured["email"] == "awa@example.com"
    assert captured["attachments"][0]["filename"] == "brief.txt"
    assert captured["attachments"][0]["content"] == b"contenu"


def test_build_quote_email_attaches_uploaded_files(monkeypatch):
    server = load_server_module(monkeypatch)

    message = server.build_quote_email(
        nom="Mamadou Barry",
        entreprise="",
        telephone="+224611100160",
        email="mamadou@example.com",
        service="Création de logos",
        description="Merci de prévoir plusieurs pistes.",
        attachments=[
            {
                "filename": "logo.pdf",
                "content": b"%PDF-1.4",
                "content_type": "application/pdf",
            }
        ],
    )

    assert message["To"] == "owner@example.com"
    assert message["Reply-To"] == "mamadou@example.com"
    attachments = list(message.iter_attachments())
    assert len(attachments) == 1
    assert attachments[0].get_filename() == "logo.pdf"
