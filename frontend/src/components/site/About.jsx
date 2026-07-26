import { motion } from "framer-motion";
import { Reveal, Overline } from "./Reveal";
import { IMAGES } from "../../data/site";

const EASE = [0.16, 1, 0.3, 1];

const AboutLine = ({ children, delay }) => (
  <span className="block overflow-hidden">
    <motion.span
      initial={{ y: "110%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className="block"
    >
      {children}
    </motion.span>
  </span>
);

export const About = () => (
  <section id="a-propos" className="relative py-24 md:py-32 border-t border-white/5" data-testid="about-section">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <Overline>01 — Notre Vision</Overline>
          <Reveal delay={0.1} className="mt-8">
            <div className="relative overflow-hidden">
              <img
                src={IMAGES.atelier}
                alt="Atelier Illiko Design"
                className="w-full aspect-[4/5] object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="lg:col-span-8 flex flex-col justify-center">
        <h2 className="font-serif-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-white">
          <AboutLine delay={0}>Nous ne faisons pas</AboutLine>
          <AboutLine delay={0.08}>
            <span>qu'</span><span className="gold-text italic">imprimer.</span>
          </AboutLine>
          <AboutLine delay={0.16}>Nous donnons vie à</AboutLine>
          <AboutLine delay={0.24}>vos ambitions.</AboutLine>
        </h2>

        <Reveal delay={0.3} className="mt-10 max-w-2xl">
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            Depuis plus de dix ans, <span className="text-white">Illiko Design</span> conjugue
            savoir-faire artisanal et technologie de pointe pour transformer vos idées en objets
            de communication d'exception. De l'enseigne lumineuse au moindre badge, chaque
            réalisation porte notre signature : la précision.
          </p>
          <p className="mt-6 text-white/50 leading-relaxed">
            Notre atelier réunit sous un même toit graphistes, imprimeurs et techniciens passionnés,
            pour un accompagnement sur mesure, du premier croquis à la pose finale.
          </p>
          <p className="mt-10 font-serif-display italic text-2xl gold-text">— L'équipe Illiko</p>
        </Reveal>
      </div>
    </div>
  </section>
);
