import { Reveal, Overline } from "./Reveal";
import { PORTFOLIO } from "../../data/site";

export const Portfolio = () => (
  <section id="realisations" className="relative py-24 md:py-32 border-t border-black/10" data-testid="portfolio-section">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <Overline>03 — Nos Réalisations</Overline>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-serif-display text-4xl md:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-[1.05]">
              Le travail <span className="gold-text italic">parle</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <p className="max-w-sm text-neutral-700 leading-relaxed">
            Une sélection de projets livrés pour des marques exigeantes, où chaque détail est
            pensé pour marquer les esprits.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] md:auto-rows-[260px] gap-4 md:gap-6">
        {PORTFOLIO.map((item, i) => (
          <Reveal
            key={item.title}
            delay={(i % 4) * 0.06}
            className={`group relative overflow-hidden border border-black/10 hover:border-gold/40 transition-colors duration-500 ${item.span}`}
            data-testid={`portfolio-item-${i}`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
            <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{item.tag}</span>
              <h3 className="mt-1 font-serif-display text-lg md:text-xl text-white">{item.title}</h3>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
