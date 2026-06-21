import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  PROFILE,
  SKILLS,
  EXPERIENCE,
  EDUCATION,
} from "../data/content";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

export default function Resume() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg pt-32 pb-16">
        <div className="mx-auto max-w-[800px] px-6 md:px-10">
          <motion.div {...fadeIn}>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Resume</span>
            </div>
            <h1 className="mb-2 font-display text-5xl italic text-text-primary md:text-6xl">
              {PROFILE.name}
            </h1>
            <p className="mb-8 text-lg text-muted">{PROFILE.title}</p>

            <section className="mb-10 border-b border-stroke pb-10">
              <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Contact</h2>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  Phone:{" "}
                  <a href={PROFILE.phoneHref} className="text-text-primary hover:underline">
                    {PROFILE.phone}
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a href={`mailto:${PROFILE.email}`} className="text-text-primary hover:underline">
                    {PROFILE.email}
                  </a>
                </li>
                <li>Address: {PROFILE.address}</li>
              </ul>
            </section>

            <section className="mb-10 border-b border-stroke pb-10">
              <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Profile</h2>
              <p className="text-sm leading-relaxed text-muted">
                Web Developer with 3+ years of experience specializing in React.js, Next.js, and
                modern frontend development. Experienced in building scalable web applications,
                integrating APIs, managing databases with Supabase, and delivering production-ready
                features. Strong focus on performance optimization, clean architecture, and
                user-centric development. Comfortable working in agile teams and delivering
                end-to-end solutions.
              </p>
            </section>

            <section className="mb-10 border-b border-stroke pb-10">
              <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Skills</h2>
              <p className="text-sm text-muted">{SKILLS.join(" • ")}</p>
            </section>

            <section className="mb-10 border-b border-stroke pb-10">
              <h2 className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
                Work Experience
              </h2>
              <div className="space-y-8">
                {EXPERIENCE.map((job) => (
                  <div key={`${job.role}-${job.period}`}>
                    <div className="mb-3 flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-lg text-text-primary">{job.role}</h3>
                        <p className="text-muted">{job.company}</p>
                      </div>
                      <p className="text-sm text-muted">{job.period}</p>
                    </div>
                    <ul className="list-inside list-disc space-y-1 text-sm text-muted">
                      {job.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10 border-b border-stroke pb-10">
              <h2 className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">Education</h2>
              <div className="space-y-6">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree} className="flex flex-col justify-between gap-1 sm:flex-row">
                    <div>
                      <h3 className="text-text-primary">{edu.degree}</h3>
                      <p className="text-sm text-muted">{edu.school}</p>
                    </div>
                    <p className="text-sm text-muted">{edu.period}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Languages</h2>
              <p className="text-sm text-muted">English • Urdu</p>
            </section>

            <Link
              to="/"
              className="group relative inline-flex rounded-full border border-stroke px-6 py-2.5 text-sm text-text-primary"
            >
              <span className="absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100 accent-gradient" />
              <span className="relative rounded-full bg-bg px-1">← Back home</span>
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}
