import { useEffect, useRef } from "react";
import gsap from "gsap";
import HLSVideo from "./HLSVideo";
import { PROFILE } from "../data/content";

const FOOTER_LINKS = [
  { label: "Email", href: `mailto:${PROFILE.email}` },
  { label: "LinkedIn", href: PROFILE.linkedin },
  { label: "Resume", href: "/resume" },
  { label: "Work", href: "/work" },
];

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const marqueeText = Array(10)
    .fill("HARIM SHAYAN • SOFTWARE ENGINEER • ")
    .join("");

  return (
    <footer id="contact" className="relative overflow-hidden bg-bg pt-16 md:pt-20 pb-8 md:pb-12">
      <div className="absolute inset-0">
        <HLSVideo flipped />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        <div className="mb-16 overflow-hidden md:mb-24">
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            <span className="font-display text-6xl italic text-text-primary/20 md:text-8xl lg:text-9xl">
              {marqueeText}
            </span>
            <span className="font-display text-6xl italic text-text-primary/20 md:text-8xl lg:text-9xl">
              {marqueeText}
            </span>
          </div>
        </div>

        <div className="mb-16 flex flex-col items-center px-6 text-center md:mb-24">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Contact</p>
          <h2 className="mb-8 font-display text-4xl italic text-text-primary md:text-6xl lg:text-7xl">
            Let&apos;s build together
          </h2>
          <div className="flex flex-col items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="group relative rounded-full border border-stroke bg-bg/80 px-10 py-4 text-lg text-text-primary backdrop-blur-md transition-transform hover:scale-105"
            >
              <span className="absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100 accent-gradient" />
              <span className="relative">{PROFILE.email}</span>
            </a>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 border-t border-stroke/50 px-6 pt-8 md:flex-row md:px-10 lg:px-16">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm text-muted transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Available for projects
          </div>
        </div>
      </div>
    </footer>
  );
}
