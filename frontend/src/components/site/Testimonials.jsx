import Marquee from "react-fast-marquee";
import { Quote as QuoteIcon, Star } from "lucide-react";
import { Overline } from "./Reveal";
import { TESTIMONIALS } from "../../data/site";

const Card = ({ t }) => (
  <div className="mx-3 w-[360px] md:w-[440px] shrink-0 p-8 border border-white/10 bg-[#0a0a0a] hover:border-gold/40 transition-colors duration-500">
    <div className="flex items-center justify-between">
      <QuoteIcon className="h-8 w-8 text-gold/50" />
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold text-gold" />
        ))}
      </div>
    </div>
    <p className="mt-6 font-serif-display text-lg md:text-xl italic text-white/85 leading-relaxed">
      « {t.quote} »
    </p>
    <div className="mt-8 flex items-center gap-4">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold font-serif-display text-lg">
        {t.name.charAt(0)}
      </span>
      <div>
        <p className="text-white font-medium">{t.name}</p>
        <p className="text-white/45 text-sm">{t.role}</p>
      </div>
    </div>
  </div>
);

export const Testimonials = () => (
  <section id="temoignages" className="relative py-24 md:py-32 border-t border-white/5" data-testid="testimonials-section">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      <div className="text-center md:text-left">
        <Overline>05 — Témoignages</Overline>
        <h2 className="mt-6 font-serif-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
          Ils nous font <span className="gold-text italic">confiance</span>
        </h2>
      </div>
    </div>

    <div className="mt-14">
      <Marquee gradient={false} speed={40} pauseOnHover autoFill>
        {TESTIMONIALS.map((t) => (
          <Card key={t.name} t={t} />
        ))}
      </Marquee>
    </div>
  </section>
);
