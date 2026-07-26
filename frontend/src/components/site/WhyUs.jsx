import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Gem, Timer, Palette, ShieldCheck } from "lucide-react";
import { Reveal, Overline } from "./Reveal";
import { STATS, WHY_US } from "../../data/site";

const ICONS = { Gem, Timer, Palette, ShieldCheck };

const Counter = ({ value, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1800;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
};

export const WhyUs = () => (
  <section id="pourquoi" className="relative py-24 md:py-32 border-t border-white/5 bg-[#080808]" data-testid="whyus-section">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      <Overline>04 — Pourquoi nous choisir</Overline>
      <Reveal delay={0.1}>
        <h2 className="mt-6 font-serif-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight max-w-3xl leading-[1.05]">
          L'exigence comme <span className="gold-text italic">signature</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 border-y border-white/10 py-12">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center md:text-left">
            <div className="font-serif-display text-4xl md:text-6xl gold-text">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm md:text-base text-white/55 uppercase tracking-wider">{s.label}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {WHY_US.map((w, i) => {
          const Icon = ICONS[w.icon];
          return (
            <Reveal
              key={w.title}
              delay={i * 0.07}
              className="group p-8 border border-white/10 hover:border-gold/40 bg-[#0a0a0a] transition-colors duration-500"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold group-hover:bg-gold group-hover:text-black transition-colors duration-400">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-serif-display text-xl text-white">{w.title}</h3>
              <p className="mt-3 text-white/55 leading-relaxed text-sm">{w.text}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
