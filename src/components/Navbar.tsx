import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PROFILE } from "../data/content";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Resume", href: "/resume" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = PROFILE.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={`inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-md shadow-black/10" : ""}`}
      >
        <Link
          to="/"
          className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
        >
          <span className="absolute inset-0 rounded-full accent-gradient transition-[background] duration-300 group-hover:[background:linear-gradient(270deg,#89AACC_0%,#4E85BF_100%)]" />
          <span className="relative flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center rounded-full bg-bg">
            <span className="font-display text-[13px] italic">{initials}</span>
          </span>
        </Link>

        <div className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        <div className="flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href;

            return (
              <Link
                key={link.label}
                to={link.href}
                className={`rounded-full px-3 py-1.5 text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? "bg-stroke/50 text-text-primary"
                    : "text-muted hover:bg-stroke/50 hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        <a
          href={`mailto:${PROFILE.email}`}
          className="group relative rounded-full px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
        >
          <span className="absolute inset-[-2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
          <span className="relative flex items-center gap-1 rounded-full bg-surface px-1 backdrop-blur-md text-text-primary">
            Say hi <span className="text-muted">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
