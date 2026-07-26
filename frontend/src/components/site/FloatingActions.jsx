import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { CONTACT } from "../../data/site";

export const FloatingActions = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="h-11 w-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white hover:text-gold transition-colors"
            data-testid="scroll-top-btn"
            aria-label="Remonter"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={CONTACT.phoneHref}
        className="group h-14 w-14 flex items-center justify-center rounded-full border border-gold/50 bg-black/60 backdrop-blur-md text-gold hover:bg-gold hover:text-black transition-colors duration-300 shadow-lg"
        data-testid="floating-call-btn"
        aria-label="Appeler"
      >
        <Phone className="h-6 w-6" />
      </a>

      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="relative h-14 w-14 flex items-center justify-center rounded-full bg-gold text-black hover:bg-gold-light transition-colors duration-300 shadow-[0_0_25px_rgba(212,175,55,0.4)]"
        data-testid="floating-whatsapp-btn"
        aria-label="WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
        <MessageCircle className="relative h-6 w-6" />
      </a>
    </div>
  );
};
