import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 40, className = "", ...props }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const Overline = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-[0.35em] font-semibold text-gold ${className}`}
  >
    <span className="h-px w-8 bg-gold/60" />
    {children}
  </span>
);
