import { motion } from "framer-motion";
import { STATS } from "../data/content";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" as const },
};

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.15 }}
              className="text-center"
            >
              <p className="mb-2 font-display text-5xl italic text-text-primary md:text-6xl lg:text-7xl">
                {stat.value}
              </p>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
