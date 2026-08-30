import { motion } from "framer-motion";
import { EXPERIENCE } from "../data/content";
import { fadeIn, GhostLink, SectionLabel } from "./ui";

const LEVEL_STYLES: Record<string, string> = {
  Senior: "border-[#89AACC]/30 bg-[#89AACC]/10 text-[#89AACC]",
  Junior: "border-stroke bg-surface text-text-primary",
  Intern: "border-stroke/80 bg-bg text-muted",
};

export default function Journal() {
  return (
    <section id="experience" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          {...fadeIn}
          className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <SectionLabel>Experience</SectionLabel>
            <h2 className="mb-3 text-3xl text-text-primary md:text-4xl lg:text-5xl">
              Work <span className="font-display italic">history</span>
            </h2>
            <p className="max-w-md text-sm text-muted md:text-base">
              3+ years at Brisktech — growing from intern to Senior Software Engineer, shipping
              production apps across the stack.
            </p>
          </div>
          <GhostLink to="/resume" className="hidden md:inline-flex">
            Full resume →
          </GhostLink>
        </motion.div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[19px] hidden w-px bg-stroke md:left-6 md:block" />

          <div className="flex flex-col gap-6 md:gap-8">
            {EXPERIENCE.map((entry, i) => {
              const isCurrent = entry.period.includes("Present");

              return (
                <motion.article
                  key={entry.role}
                  {...fadeIn}
                  transition={{ ...fadeIn.transition, delay: i * 0.12 }}
                  className="group relative md:pl-16"
                >
                  <div className="absolute left-0 top-8 hidden md:flex md:items-center md:justify-center">
                    <span
                      className={`relative z-10 flex h-3 w-3 rounded-full border-2 ${
                        isCurrent ? "border-[#89AACC] bg-[#89AACC]" : "border-stroke bg-bg"
                      }`}
                    >
                      {isCurrent && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#89AACC] opacity-60" />
                      )}
                    </span>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-stroke bg-surface/40 transition-colors hover:border-stroke/80 hover:bg-surface md:rounded-3xl">
                    <div className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between md:p-8">
                      <div className="min-w-0 flex-1">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${LEVEL_STYLES[entry.level] ?? LEVEL_STYLES.Junior}`}
                          >
                            {entry.level}
                          </span>
                          {isCurrent && (
                            <span className="flex items-center gap-1.5 rounded-full border border-stroke bg-bg px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-muted">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Current
                            </span>
                          )}
                        </div>

                        <h3 className="mb-1 font-display text-xl italic text-text-primary md:text-2xl">
                          {entry.role}
                        </h3>
                        <p className="mb-4 text-sm text-muted">
                          {entry.company} · {entry.period}
                        </p>
                        <p className="border-l-2 border-[#89AACC]/40 pl-4 text-sm leading-relaxed text-text-primary/90 md:text-base">
                          {entry.focus}
                        </p>
                        {entry.spotlight && (
                          <p className="mt-4 text-xs text-muted md:text-sm">{entry.spotlight}</p>
                        )}
                      </div>

                      <div className="hidden shrink-0 md:flex md:h-16 md:w-16 md:items-center md:justify-center md:rounded-2xl md:border md:border-stroke md:bg-bg">
                        <span className="font-display text-2xl italic text-text-primary/80">B</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div {...fadeIn} className="mt-8 flex justify-center md:hidden">
          <GhostLink to="/resume">Full resume →</GhostLink>
        </motion.div>
      </div>
    </section>
  );
}
