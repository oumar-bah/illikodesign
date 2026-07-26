import { Sparkles, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, ALL_SERVICES, CONTACT } from "../../data/site";

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Footer = () => (
  <footer className="relative border-t border-white/10 bg-[#050505]" data-testid="footer">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-gold" />
            <span className="font-cinzel text-2xl tracking-[0.15em] text-white">
              ILLIKO<span className="text-gold"> DESIGN</span>
            </span>
          </div>
          <p className="mt-6 max-w-sm text-white/50 leading-relaxed">
            Imprimerie & communication visuelle haut de gamme. Nous donnons vie à vos ambitions
            avec précision et élégance.
          </p>
          <button
            onClick={() => scrollTo("#devis")}
            className="mt-8 group inline-flex items-center gap-2 text-gold border border-gold/50 px-6 py-3 hover:bg-gold hover:text-black transition-all duration-300"
            data-testid="footer-devis-btn"
          >
            Démarrer un projet
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Navigation</p>
          <ul className="mt-6 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className="text-white/55 hover:text-gold transition-colors duration-300"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Prestations phares</p>
          <ul className="mt-6 grid grid-cols-1 gap-3">
            {ALL_SERVICES.slice(0, 6).map((s) => (
              <li key={s} className="text-white/55">{s}</li>
            ))}
          </ul>
          <p className="mt-6 text-white/40 text-sm">{CONTACT.address}</p>
        </div>
      </div>

      <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} Illiko Design. Tous droits réservés.
        </p>
        <p className="text-white/30 text-sm">Conçu avec exigence — Noir · Or · Blanc</p>
      </div>
    </div>
  </footer>
);
