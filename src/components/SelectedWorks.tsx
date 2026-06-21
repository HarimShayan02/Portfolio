import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FEATURED_PROJECTS } from "../data/content";
import CardSwap, { Card } from "./CardSwap";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" as const },
};

export default function SelectedWorks() {
  return (
    <section id="featured" className="bg-bg py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...fadeIn}>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Featured</span>
            </div>
            <h2 className="mb-3 text-3xl text-text-primary md:text-4xl lg:text-5xl">
              Highlighted <span className="font-display italic">projects</span>
            </h2>
            <p className="mb-8 max-w-md text-sm text-muted md:text-base">
              A curated selection of recent work — cards cycle automatically with depth and
              perspective. Hover to pause, click to visit.
            </p>
            <Link
              to="/work"
              className="group relative inline-flex rounded-full border border-stroke px-6 py-2.5 text-sm text-text-primary"
            >
              <span className="absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100 accent-gradient" />
              <span className="relative flex items-center gap-2 rounded-full bg-bg px-1">
                View all work <span>→</span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative h-[300px] w-[min(100%,340px)] sm:h-[340px] sm:w-[400px] md:h-[380px] md:w-[440px]">
              <CardSwap
                width="100%"
                height="100%"
                cardDistance={36}
                verticalDistance={32}
                delay={4500}
                pauseOnHover
                skewAmount={4}
                easing="elastic"
              >
                {FEATURED_PROJECTS.map((project) => (
                  <Card
                    key={project.title}
                    className="group p-0"
                    onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}
                  >
                    <div className="relative flex h-full w-full flex-col">
                      <div className="flex-1 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="halftone-overlay absolute inset-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                      </div>
                      <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span className="rounded-full border border-white/10 bg-bg/50 px-2.5 py-0.5 text-[10px] text-text-primary backdrop-blur-md">
                            {project.location}
                          </span>
                          <span className="rounded-full border border-white/10 bg-bg/50 px-2.5 py-0.5 text-[10px] text-text-primary backdrop-blur-md">
                            {project.period}
                          </span>
                        </div>
                        <h3 className="mb-1.5 font-display text-xl italic text-text-primary md:text-2xl">
                          {project.title}
                        </h3>
                        <p className="line-clamp-2 text-xs leading-relaxed text-muted md:text-sm">
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
