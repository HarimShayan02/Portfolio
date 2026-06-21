import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HLSVideo from "./HLSVideo";
import { PROFILE, ROLES } from "../data/content";

interface HeroProps {
  animate?: boolean;
}

export default function Hero({ animate = false }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!animate || !contentRef.current || !nameRef.current) return;

    const blurElements = contentRef.current.querySelectorAll<HTMLElement>(".blur-in");
    const targets = [nameRef.current, ...blurElements];

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(nameRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      delay: 0.1,
    }).from(
      blurElements,
      {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        duration: 1,
        stagger: 0.1,
      },
      0.3
    );

    return () => {
      tl.kill();
      gsap.set(targets, { clearProps: "all" });
    };
  }, [animate]);

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <HLSVideo />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute right-0 bottom-0 left-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div ref={contentRef} className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
          {PROFILE.title}
        </p>

        <h1
          ref={nameRef}
          className="mb-6 font-display text-5xl leading-[0.9] tracking-tight italic text-text-primary sm:text-6xl md:text-8xl lg:text-9xl"
        >
          {PROFILE.name}
        </h1>

        <p className="blur-in mb-12 text-sm text-muted md:text-base">
          A{" "}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display italic text-text-primary"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          developer based in {PROFILE.location}.
        </p>

        <p className="blur-in mb-12 max-w-lg text-sm text-muted md:text-base">
          {PROFILE.summary}
        </p>

        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <Link
            to="/work"
            className="group relative inline-block rounded-full text-sm transition-transform hover:scale-105"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100 accent-gradient" />
            <span className="relative block rounded-full bg-text-primary px-7 py-3.5 text-bg transition-colors group-hover:bg-bg group-hover:text-text-primary">
              See Projects
            </span>
          </Link>
          <a
            href={`mailto:${PROFILE.email}`}
            className="group relative inline-block rounded-full text-sm transition-transform hover:scale-105"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100 accent-gradient" />
            <span className="relative block rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-text-primary transition-colors group-hover:border-bg">
              Reach out...
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Scroll</span>
        <div className="relative h-10 w-px overflow-hidden bg-stroke">
          <div className="absolute top-0 left-0 h-1/2 w-full animate-scroll-down accent-gradient" />
        </div>
      </div>
    </section>
  );
}
