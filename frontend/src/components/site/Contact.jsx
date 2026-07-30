import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Linkedin, Music2, ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "./Reveal";
import { CONTACT } from "../../data/site";

const SOCIAL_ICONS = { Instagram, Facebook, Linkedin, Music2 };

const InfoRow = ({ icon: Icon, label, value, href, testid }) => {
  const content = (
    <div className="group flex items-start gap-4 py-5 border-b border-black/10" data-testid={testid}>
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold group-hover:bg-gold group-hover:text-black transition-colors duration-400">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{label}</p>
        <p className="mt-1 text-neutral-950 group-hover:text-gold transition-colors duration-300">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};

export const Contact = () => (
  <section id="contact" className="relative py-24 md:py-32 border-t border-black/10 bg-white" data-testid="contact-section">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
      <div>
        <Overline>08 — Contact</Overline>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-serif-display text-4xl md:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-[1.05]">
            Passons à <span className="gold-text italic">l'action</span>
          </h2>
          <p className="mt-6 text-neutral-700 leading-relaxed max-w-md">
            Notre atelier vous accueille et vous conseille. Écrivez-nous, appelez-nous ou
            passez nous voir.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <InfoRow icon={Phone} label="Téléphone" value={CONTACT.phone} href={CONTACT.phoneHref} testid="contact-phone" />
          <InfoRow icon={Mail} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} testid="contact-email" />
          <InfoRow icon={MapPin} label="Adresse" value={CONTACT.address} testid="contact-address" />
          <InfoRow icon={Clock} label="Horaires" value={CONTACT.hours} testid="contact-hours" />

          <div className="mt-8 flex items-center gap-3">
            {CONTACT.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-12 w-12 items-center justify-center border border-black/10 bg-[#faf7f2] text-neutral-700 hover:border-gold hover:text-gold transition-colors duration-300"
                  data-testid={`social-${s.label.toLowerCase()}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="relative min-h-[380px] lg:min-h-full border border-black/10 overflow-hidden">
        <iframe
          title="Localisation Illiko Design"
          src={CONTACT.mapEmbed}
          className="absolute inset-0 h-full w-full grayscale contrast-125 invert-[0.92] hue-rotate-180"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          data-testid="contact-map"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
      </Reveal>
    </div>
  </section>
);
