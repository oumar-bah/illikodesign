import { useRef, useState } from "react";
import { toast } from "sonner";
import { Send, Upload, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Reveal, Overline } from "./Reveal";
import { ALL_SERVICES, IMAGES } from "../../data/site";

const inputClass =
  "w-full bg-transparent border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-gold transition-colors duration-300";

export const Quote = () => {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    nom: "",
    entreprise: "",
    telephone: "",
    email: "",
    service: "",
    description: "",
  });
  const [files, setFiles] = useState([]);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const resetForm = () => {
    setForm({ nom: "", entreprise: "", telephone: "", email: "", service: "", description: "" });
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.telephone || !form.service) {
      toast.error("Veuillez renseigner les champs obligatoires.");
      return;
    }

    const requestBody = new FormData();
    Object.entries(form).forEach(([key, value]) => requestBody.append(key, value));
    files.forEach((file) => requestBody.append("files", file));

    setIsSubmitting(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_QUOTE_API_URL || "/api/quotes",
        {
          method: "POST",
          body: requestBody,
        }
      );
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.detail || "Impossible d'envoyer votre demande pour le moment.");
      }

      setSent(true);
      toast.success(payload.message || "Demande envoyée ! Nous vous répondons sous 24h.", {
        description: `Merci ${form.nom}, votre projet nous intéresse.`,
      });
      resetForm();
    } catch (error) {
      toast.error(error.message || "Impossible d'envoyer votre demande pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="devis" className="relative py-24 md:py-32 border-t border-black/10 bg-[#f7f3eb]" data-testid="quote-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
        <div>
          <Overline>06 — Demande de devis</Overline>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-serif-display text-4xl md:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-[1.05]">
              Parlons de votre <span className="gold-text italic">projet</span>
            </h2>
            <p className="mt-6 text-neutral-700 leading-relaxed max-w-md">
              Décrivez votre besoin et joignez vos fichiers. Vous recevez une proposition
              détaillée et personnalisée sous 24 heures.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 relative overflow-hidden hidden lg:block">
            <img src={IMAGES.stationery} alt="Réalisations premium" className="w-full aspect-[4/3] object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="border border-black/10 bg-neutral-950 p-8 md:p-10 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center"
                data-testid="quote-success"
              >
                <CheckCircle2 className="h-16 w-16 text-gold" />
                <h3 className="mt-6 font-serif-display text-3xl text-white">Merci !</h3>
                <p className="mt-3 text-white/60 max-w-sm">
                  Votre demande a bien été prise en compte. Notre équipe revient vers vous très
                  rapidement.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    resetForm();
                  }}
                  className="mt-8 inline-flex items-center gap-2 border border-gold/50 text-gold px-6 py-3 hover:bg-gold hover:text-black transition-all duration-300"
                  data-testid="quote-reset-btn"
                >
                  <Sparkles className="h-4 w-4" /> Nouvelle demande
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8" data-testid="quote-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <input className={inputClass} placeholder="Nom complet *" value={form.nom} onChange={update("nom")} data-testid="quote-nom" />
                  <input className={inputClass} placeholder="Entreprise" value={form.entreprise} onChange={update("entreprise")} data-testid="quote-entreprise" />
                  <input className={inputClass} placeholder="Téléphone *" value={form.telephone} onChange={update("telephone")} data-testid="quote-telephone" />
                  <input type="email" className={inputClass} placeholder="Email *" value={form.email} onChange={update("email")} data-testid="quote-email" />
                </div>

                <div>
                  <Select value={form.service} onValueChange={(v) => setForm((f) => ({ ...f, service: v }))}>
                    <SelectTrigger
                      className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 h-auto text-white focus:ring-0 focus:border-gold data-[placeholder]:text-white/35"
                      data-testid="quote-service"
                    >
                      <SelectValue placeholder="Service souhaité *" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border-white/10 text-white max-h-72">
                      {ALL_SERVICES.map((s) => (
                        <SelectItem key={s} value={s} className="focus:bg-gold/20 focus:text-gold">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <textarea
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Description du projet"
                  value={form.description}
                  onChange={update("description")}
                  data-testid="quote-description"
                />

                <label className="flex items-center gap-4 border-b border-white/20 py-3 cursor-pointer hover:border-gold transition-colors duration-300" data-testid="quote-file-label">
                  <Upload className="h-5 w-5 text-gold" />
                  <span className="text-white/60 truncate">
                    {files.length
                      ? `${files.length} fichier${files.length > 1 ? "s" : ""} sélectionné${files.length > 1 ? "s" : ""}`
                      : "Téléverser un ou plusieurs fichiers (logo, visuel...)"}
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    data-testid="quote-file"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full inline-flex items-center justify-center gap-2 bg-gold text-black font-semibold px-8 py-4 hover:bg-gold-light transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-70"
                  data-testid="quote-submit-btn"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
