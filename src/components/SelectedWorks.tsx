import { motion } from "framer-motion";
import { FEATURED_PROJECTS } from "../data/content";
import CardSwap, { Card } from "./CardSwap";
import { fadeIn, GhostLink, SectionLabel } from "./ui";

export default function SelectedWorks() {
  return (
    <section id="featured" className="overflow-x-hidden bg-bg py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div {...fadeIn}>
            <SectionLabel>Featured</SectionLabel>
            <h2 className="mb-3 text-3xl text-text-primary md:text-4xl lg:text-5xl">
              Highlighted <span className="font-display italic">projects</span>
            </h2>
            <p className="mb-8 max-w-md text-sm text-muted md:text-base">
              A curated selection of recent work — cards cycle automatically with depth and
              perspective. Hover to pause, click to visit.
            </p>
            <GhostLink to="/work">View all work →</GhostLink>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.15 }}
            className="flex w-full justify-center pt-8 pr-6 lg:justify-end"
          >
            <div className="relative h-[220px] w-full max-w-[280px] sm:h-[260px] sm:max-w-[360px] lg:h-[320px] lg:max-w-[440px]">
              <CardSwap
                width="100%"
                height="100%"
                cardDistance={16}
                verticalDistance={20}
                delay={4500}
                pauseOnHover
                skewAmount={3}
                easing="elastic"
              >
                {FEATURED_PROJECTS.map((project) => (
                  <Card
                    key={project.title}
                    className="p-0"
                    onClick={() => project.url && window.open(project.url, "_blank", "noopener,noreferrer")}
                  >
                    <div className="flex h-full w-full flex-col">
                      <div className="min-h-0 flex-1 overflow-y-auto bg-bg">
                        <img src={project.image} alt={project.title} className="block h-auto w-full" />
                      </div>
                      <div className="shrink-0 border-t border-stroke bg-surface px-3 py-2.5 sm:px-4 sm:py-3.5">
                        <div className="mb-1.5 flex flex-wrap gap-1.5">
                          <span className="rounded-full border border-stroke bg-bg px-2 py-0.5 text-[10px] text-muted">
                            {project.location}
                          </span>
                          <span className="rounded-full border border-stroke bg-bg px-2 py-0.5 text-[10px] text-muted">
                            {project.period}
                          </span>
                        </div>
                        <h3 className="font-display text-base italic text-text-primary sm:text-lg md:text-xl">
                          {project.title}
                        </h3>
                        <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted sm:text-xs">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
