import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

/**
 * Reveal — juego de aparición en scroll con física suave.
 * - `amount` controla cuánto debe estar visible antes de dispararse (default 0.2).
 * - `delay` añade un retardo opcional en segundos.
 * - Respeta `prefers-reduced-motion` (renders estáticos).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  amount = 0.2,
  once = true,
  className = '',
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Versión con retardo basado en índice para cascadas uniformes. */
export function RevealItem({ index = 0, step = 0.08, children, className = '', amount = 0.15 }) {
  return (
    <Reveal delay={index * step} amount={amount} className={className}>
      {children}
    </Reveal>
  );
}