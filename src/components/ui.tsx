import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" as const },
};

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-8 bg-stroke" />
      <span className="text-xs uppercase tracking-[0.3em] text-muted">{children}</span>
    </div>
  );
}

type GhostLinkProps = {
  children: ReactNode;
  className?: string;
  to?: string;
  href?: string;
};

export function GhostLink({ children, className = "", to, href }: GhostLinkProps) {
  const cls = `group relative inline-flex rounded-full border border-stroke px-6 py-2.5 text-sm text-text-primary ${className}`;
  const inner = (
    <>
      <span className="absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100 accent-gradient" />
      <span className="relative rounded-full bg-bg px-1">{children}</span>
    </>
  );

  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <a href={href} className={cls}>{inner}</a>;
}
