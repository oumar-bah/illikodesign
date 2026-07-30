import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Reveal, Overline } from "./Reveal";
import { FAQ as FAQ_DATA } from "../../data/site";

export const Faq = () => (
  <section id="faq" className="relative py-24 md:py-32 border-t border-black/10" data-testid="faq-section">
    <div className="max-w-3xl mx-auto px-6 md:px-12">
      <div className="text-center">
        <Overline className="justify-center">07 — Questions fréquentes</Overline>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-serif-display text-4xl md:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-[1.05]">
            Vos <span className="gold-text italic">questions</span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-14">
        <Accordion type="single" collapsible className="w-full">
          {FAQ_DATA.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-black/10">
              <AccordionTrigger
                className="py-6 font-serif-display text-xl md:text-2xl text-neutral-950 hover:text-gold hover:no-underline text-left [&>svg]:text-gold"
                data-testid={`faq-trigger-${i}`}
              >
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700 leading-relaxed text-base pb-6">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
);
