import { motion } from "framer-motion";
import MasonryGallery from "./MasonryGallery";
import { SKILLS, WORK_VISUALS } from "../data/content";
import { fadeIn, GhostLink, SectionLabel } from "./ui";

export default function Explorations() {
  return (
    <section id="explorations" className="overflow-hidden bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          {...fadeIn}
          className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <SectionLabel>Explorations</SectionLabel>
            <h2 className="mb-3 text-3xl text-text-primary md:text-4xl lg:text-5xl">
              Visual <span className="font-display italic">craft</span>
            </h2>
            <p className="max-w-lg text-sm text-muted md:text-base">
              Snapshots from the work — custom interfaces, reusable components, clean code, and
              the details that go into building real products.
            </p>
          </div>
          <GhostLink to="/work" className="visual-craft-cta-link hidden md:inline-flex">
            View all projects <span className="arrow ml-1 inline-block">→</span>
          </GhostLink>
        </motion.div>

        <MasonryGallery items={WORK_VISUALS} />

        <motion.div {...fadeIn} className="mt-12 md:mt-14">
          <SectionLabel>Tech stack</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-stroke bg-surface/40 px-3 py-1.5 text-xs text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeIn} className="mt-8 flex justify-center md:hidden">
          <GhostLink to="/work" className="visual-craft-cta-link">
            View all projects <span className="arrow ml-1 inline-block">→</span>
          </GhostLink>
        </motion.div>
      </div>
    </section>
  );
}
