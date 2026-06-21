import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MasonryGallery from "./MasonryGallery";
import { SKILLS, WORK_VISUALS } from "../data/content";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" as const },
};

export default function Explorations() {
  const galleryAnchorRef = useRef<HTMLDivElement>(null);
  const [galleryReady, setGalleryReady] = useState(false);

  useEffect(() => {
    const node = galleryAnchorRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGalleryReady(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="explorations" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          {...fadeIn}
          className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Explorations</span>
            </div>
            <h2 className="mb-3 text-3xl text-text-primary md:text-4xl lg:text-5xl">
              Visual <span className="font-display italic">craft</span>
            </h2>
            <p className="max-w-lg text-sm text-muted md:text-base">
              Snapshots from the work — custom interfaces, reusable components, clean code, and
              the details that go into building real products.
            </p>
          </div>
          <Link
            to="/work"
            className="group relative hidden rounded-full border border-stroke px-6 py-2.5 text-sm text-text-primary md:inline-flex md:items-center md:gap-2"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100 accent-gradient" />
            <span className="relative flex items-center gap-2 rounded-full bg-bg px-1">
              View all projects <span>→</span>
            </span>
          </Link>
        </motion.div>

        <div ref={galleryAnchorRef}>
          {galleryReady && (
            <MasonryGallery
              items={WORK_VISUALS}
              animateFrom="bottom"
              blurToFocus
              stagger={0.08}
              scaleOnHover
              hoverScale={0.96}
              colorShiftOnHover
            />
          )}
        </div>

        <motion.div {...fadeIn} className="mt-12 md:mt-14">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Tech stack</span>
          </div>
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
          <Link
            to="/work"
            className="group relative inline-flex rounded-full border border-stroke px-6 py-2.5 text-sm text-text-primary"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100 accent-gradient" />
            <span className="relative rounded-full bg-bg px-1">View all projects →</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
