import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export interface MasonryItem {
  id: string;
  img: string;
  url?: string;
  title?: string;
  width?: number;
  height?: number;
}

const EASE = [0.25, 0.1, 0.25, 1] as const;

function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return fine;
}

function ParallaxFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

function CardLink({
  url,
  className,
  ariaLabel,
  children,
}: {
  url?: string;
  className?: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  if (url?.startsWith("http")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={url || "/work"} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

function GalleryCard({
  item,
  index,
  parallax,
  reduceMotion,
}: {
  item: MasonryItem;
  index: number;
  parallax: boolean;
  reduceMotion: boolean | null;
}) {
  const media = (
    <img
      src={item.img}
      alt={item.title ?? ""}
      width={item.width}
      height={item.height}
      className="visual-craft-img"
      style={
        item.width && item.height
          ? { aspectRatio: `${item.width} / ${item.height}` }
          : undefined
      }
      loading={index < 2 ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
    />
  );

  return (
    <article className="visual-craft-card">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
      >
        <CardLink
          url={item.url}
          className="visual-craft-link group block rounded-2xl"
          ariaLabel={item.title ? `View project: ${item.title}` : "View project"}
        >
          <div className="visual-craft-frame overflow-hidden rounded-2xl border border-stroke bg-bg">
            <div className="visual-craft-media relative">
              {parallax ? <ParallaxFrame>{media}</ParallaxFrame> : media}
              <div className="visual-craft-overlay" />
              <div className="visual-craft-cta">
                <span>
                  View project <span className="arrow">↗</span>
                </span>
              </div>
            </div>
            {item.title && (
              <div className="flex items-center justify-between gap-3 border-t border-stroke/50 bg-surface/80 px-4 py-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-primary">
                  <span className="mr-2.5 tabular-nums text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </p>
                <span className="visual-craft-caption-arrow text-xs text-muted">↗</span>
              </div>
            )}
          </div>
        </CardLink>
      </motion.div>
    </article>
  );
}

export default function MasonryGallery({ items }: { items: MasonryItem[] }) {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const parallax = Boolean(finePointer && !reduceMotion);

  return (
    <div className="columns-1 gap-4 md:columns-2 md:gap-5 lg:columns-3 lg:gap-6">
      {items.map((item, index) => (
        <GalleryCard
          key={item.id}
          item={item}
          index={index}
          parallax={parallax}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
