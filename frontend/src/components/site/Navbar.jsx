import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { NAV_LINKS } from "../../data/site";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-black/10 shadow-[0_10px_40px_rgba(15,23,42,0.08)]"
          : "bg-transparent"
      }`}
      data-testid="main-navbar"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
          data-testid="logo-btn"
        >
          <Sparkles className="h-5 w-5 text-gold" />
          <span className={`font-cinzel text-xl tracking-[0.15em] ${scrolled ? "text-neutral-950" : "text-white"}`}>
            ILLIKO<span className="text-gold"> DESIGN</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className={`text-sm tracking-wide transition-colors duration-300 ${
                scrolled ? "text-neutral-600 hover:text-neutral-950" : "text-white/75 hover:text-white"
              }`}
              data-testid={`nav-${l.href.replace("#", "")}`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go("#devis")}
            className="hidden sm:inline-flex bg-gold text-black font-semibold text-sm px-6 py-3 hover:bg-gold-light transition-colors duration-300"
            data-testid="nav-devis-btn"
          >
            Demander un devis
          </button>
          <button
            className={`lg:hidden p-2 ${scrolled ? "text-neutral-950" : "text-white"}`}
            onClick={() => setOpen((o) => !o)}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-black/10"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="text-left py-3 text-lg font-serif text-neutral-800 hover:text-gold border-b border-black/5 transition-colors"
                  data-testid={`mobile-nav-${l.href.replace("#", "")}`}
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => go("#devis")}
                className="mt-4 bg-gold text-black font-semibold px-6 py-4"
                data-testid="mobile-nav-devis-btn"
              >
                Demander un devis
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
