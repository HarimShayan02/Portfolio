import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { PROJECTS } from "../data/content";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const cardFade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-60px" as const },
};

export default function Work() {
  const total = PROJECTS.length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg pt-28 pb-16 md:pt-32">
        <div className="mx-auto max-w-[1060px] px-6 md:px-10">
          <motion.div {...fadeIn} className="mb-10 md:mb-12">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Work</span>
            </div>
            <h1 className="mb-2 text-3xl text-text-primary md:text-4xl">
              All <span className="font-display italic">projects</span>
            </h1>
            <p className="text-sm text-muted">
              {total} projects · US, Netherlands, Brazil, Saudi Arabia & more
            </p>
          </motion.div>

          <div className="flex flex-col gap-5 md:gap-6">
            {PROJECTS.map((project, index) => (
              <motion.article
                key={project.title}
                {...cardFade}
                transition={{ ...cardFade.transition, delay: index * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-stroke bg-surface md:rounded-3xl"
              >
                <div className="flex flex-col md:min-h-[300px] md:flex-row">
                  {/* Preview panel */}
                  <div className="relative min-h-[200px] w-full overflow-hidden md:w-[46%] md:min-h-0">
                    <img
                      src={project.image}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-75"
                    />
                    <div className="absolute inset-0 bg-bg/30" />
                    <div className="relative flex h-full items-center justify-center p-6 md:p-8">
                      <div className="w-full max-w-[92%] overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a]/80 shadow-2xl shadow-black/50 ring-1 ring-white/5">
                        <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
                          <span className="h-2 w-2 rounded-full bg-white/20" />
                          <span className="h-2 w-2 rounded-full bg-white/20" />
                          <span className="h-2 w-2 rounded-full bg-white/20" />
                        </div>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="block w-full object-contain object-top"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Details panel */}
                  <div className="relative flex w-full flex-col justify-between p-6 md:w-[54%] md:p-8 lg:p-10">
                    <div className="pointer-events-none absolute -top-8 -right-8 h-40 w-40 rounded-full bg-[#4E85BF]/20 blur-3xl" />

                    <div>
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded border border-[#89AACC]/25 bg-[#89AACC]/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#89AACC]">
                            {project.category}
                          </span>
                          {"private" in project && project.private && (
                            <span className="rounded border border-stroke bg-bg px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-muted">
                              Private
                            </span>
                          )}
                        </div>
                        <span className="text-xs tabular-nums text-muted">
                          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>
                      </div>

                      <h2 className="mb-2 text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
                        {project.title}
                      </h2>

                      <p className="mb-3 text-xs text-muted">
                        {project.period} · {project.location}
                      </p>

                      <p className="mb-6 text-sm leading-relaxed text-muted">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-stroke bg-bg/50 px-2.5 py-1 text-[11px] text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 border-t border-stroke pt-5">
                      {"url" in project && project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-text-primary transition-colors hover:text-[#89AACC]"
                        >
                          View Project
                          <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            ↗
                          </span>
                        </a>
                      ) : (
                        <span className="text-sm text-muted">Private project — link unavailable</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div {...fadeIn} className="mt-10 flex flex-wrap gap-3 border-t border-stroke pt-8">
            <Link
              to="/"
              className="group relative inline-flex rounded-full border border-stroke px-5 py-2 text-xs text-text-primary sm:text-sm"
            >
              <span className="absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100 accent-gradient" />
              <span className="relative rounded-full bg-bg px-0.5">← Home</span>
            </Link>
            <Link
              to="/resume"
              className="group relative inline-flex rounded-full border border-stroke px-5 py-2 text-xs text-text-primary sm:text-sm"
            >
              <span className="absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100 accent-gradient" />
              <span className="relative rounded-full bg-bg px-0.5">Resume →</span>
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}
