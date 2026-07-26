import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Lightbulb, Printer, Car, Shirt, PenTool, Gem, ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "./Reveal";
import { SERVICE_CATEGORIES, ALL_SERVICES } from "../../data/site";

const ICONS = { Lightbulb, Printer, Car, Shirt, PenTool, Gem };

const ServiceCard = ({ cat, index }) => {
  const Icon = ICONS[cat.icon];
  return (
    <Reveal
      delay={index * 0.06}
      className={`group relative overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-gold/50 transition-colors duration-500 min-h-[340px] ${cat.span}`}
    >
      <div className="absolute inset-0">
        <img
          src={cat.image}
          alt={cat.title}
          className="h-full w-full object-cover opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent" />
      </div>

      <div className="relative z-10 h-full p-8 flex flex-col">
        <div className="flex items-start justify-between">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold group-hover:bg-gold group-hover:text-black transition-colors duration-400">
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-serif-display text-4xl text-white/10 group-hover:text-gold/40 transition-colors duration-500">
            {cat.number}
          </span>
        </div>

        <div className="mt-auto pt-8">
          <h3 className="font-serif-display text-2xl md:text-3xl text-white group-hover:gold-text transition-all duration-300">
            {cat.title}
          </h3>
          <p className="mt-3 text-white/55 leading-relaxed max-w-md">{cat.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {cat.items.map((it) => (
              <li
                key={it}
                className="text-xs uppercase tracking-wider text-white/60 border border-white/10 px-3 py-1.5 rounded-full group-hover:border-gold/30 transition-colors"
              >
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
};

export const Services = () => (
  <section id="services" className="relative py-24 md:py-32 border-t border-white/5" data-testid="services-section">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <Overline>02 — Nos Services</Overline>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-serif-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight max-w-2xl leading-[1.05]">
              Un savoir-faire <span className="gold-text italic">complet</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <p className="max-w-sm text-white/55 leading-relaxed">
            Six pôles d'expertise, plus de trente prestations, une seule exigence : l'excellence
            à chaque étape de votre projet.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {SERVICE_CATEGORIES.map((cat, i) => (
          <ServiceCard key={cat.id} cat={cat} index={i} />
        ))}
      </div>
    </div>

    <div className="mt-16 py-5 border-y border-white/10 bg-[#080808]">
      <Marquee gradient={false} speed={45} autoFill>
        {ALL_SERVICES.map((s) => (
          <span key={s} className="mx-6 inline-flex items-center gap-6 text-white/45">
            <span className="font-serif-display text-xl md:text-2xl italic whitespace-nowrap">{s}</span>
            <Gem className="h-3.5 w-3.5 text-gold/70" />
          </span>
        ))}
      </Marquee>
    </div>
  </section>
);
