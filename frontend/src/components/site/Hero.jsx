import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { IMAGES } from "../../data/site";

const EASE = [0.16, 1, 0.3, 1];
const lines = ["L'impression", "qui sublime", "votre marque."];

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden" data-testid="hero-section">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Atelier d'impression premium Illiko Design"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-20 md:pb-28"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-[0.35em] font-semibold text-gold mb-6"
        >
          <span className="h-px w-10 bg-gold/60" />
          Imprimerie & Communication Visuelle
        </motion.span>

        <h1 className="font-serif-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-white max-w-5xl">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.45 + i * 0.15 }}
                className={`block ${i === 1 ? "gold-text italic" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
          className="mt-8 max-w-xl text-lg md:text-xl text-white/70 leading-relaxed"
        >
          Votre vision, notre précision. Enseignes lumineuses, grand format, textile et objets
          publicitaires façonnés avec une exigence haute couture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => scrollTo("#devis")}
            className="group inline-flex items-center justify-center gap-2 bg-gold text-black font-semibold px-8 py-4 hover:bg-gold-light transition-colors duration-300"
            data-testid="hero-devis-btn"
          >
            Demander un devis
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          <button
            onClick={() => scrollTo("#realisations")}
            className="inline-flex items-center justify-center gap-2 border border-gold/60 text-gold font-semibold px-8 py-4 backdrop-blur-sm hover:bg-gold hover:text-black transition-all duration-300"
            data-testid="hero-realisations-btn"
          >
            Nos réalisations
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 right-6 md:right-12 z-10 flex items-center gap-2 text-white/50 text-xs uppercase tracking-[0.25em]"
      >
        Défiler <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
};
