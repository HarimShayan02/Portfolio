import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const LABEL_HEIGHT = 52;
const IMAGE_PADDING = 12;

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    const match = queries.findIndex((q) => window.matchMedia(q).matches);
    return values[match] !== undefined ? values[match] : defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => window.matchMedia(q).addEventListener("change", handler));
    return () => queries.forEach((q) => window.matchMedia(q).removeEventListener("change", handler));
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

export interface MasonryItem {
  id: string;
  img: string;
  url?: string;
  height?: number;
  title?: string;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MasonryGalleryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}

export default function MasonryGallery({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.96,
  blurToFocus = true,
  colorShiftOnHover = true,
  className,
  itemClassName,
}: MasonryGalleryProps) {
  const columns = useMedia(
    ["(min-width: 1280px)", "(min-width: 900px)", "(min-width: 600px)", "(min-width: 400px)"],
    [4, 3, 2, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const [imageSizes, setImageSizes] = useState<Record<string, { w: number; h: number }>>({});
  const hasMounted = useRef(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === "random") {
      const dirs = ["top", "bottom", "left", "right"] as const;
      direction = dirs[Math.floor(Math.random() * dirs.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    const sizes: Record<string, { w: number; h: number }> = {};

    Promise.all(
      items.map(
        (item) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = item.img;
            img.onload = () => {
              sizes[item.id] = { w: img.naturalWidth, h: img.naturalHeight };
              resolve();
            };
            img.onerror = () => resolve();
          })
      )
    ).then(() => {
      setImageSizes(sizes);
      setImagesReady(true);
    });
  }, [items]);

  const { grid, containerHeight } = useMemo(() => {
    if (!width) return { grid: [] as GridItem[], containerHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    const gridItems = items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const natural = imageSizes[child.id];
      const aspect = natural ? natural.h / natural.w : (child.height ?? 400) / 400;
      const imageHeight = (columnWidth - IMAGE_PADDING * 2) * aspect;
      const height = imageHeight + LABEL_HEIGHT + IMAGE_PADDING * 2;
      const y = colHeights[col];
      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });

    return { grid: gridItems, containerHeight: Math.max(...colHeights) };
  }, [columns, items, width, imageSizes]);

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;

    grid.forEach((item, index) => {
      const element = document.querySelector(`[data-key="${item.id}"]`);
      if (!element) return;

      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          element,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(16px)" }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 1.1,
            ease: "power3.out",
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(element, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    if (grid.length > 0) hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (_id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(element, { scale: hoverScale, duration: 0.4, ease: "power2.out" });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) gsap.to(overlay, { opacity: 0.35, duration: 0.4 });
    }
  };

  const handleMouseLeave = (_id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(element, { scale: 1, duration: 0.4, ease: "power2.out" });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4 });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ height: containerHeight, minHeight: "320px" }}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className={cn(
            "absolute flex flex-col overflow-hidden rounded-2xl border border-stroke bg-bg cursor-pointer",
            "shadow-lg shadow-black/20 transition-shadow hover:shadow-xl hover:shadow-black/30",
            itemClassName
          )}
          style={{ willChange: "transform, width, height, opacity, filter" }}
          onClick={() => item.url && window.open(item.url, "_blank", "noopener,noreferrer")}
          onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
          onKeyDown={(e) =>
            item.url && e.key === "Enter" && window.open(item.url, "_blank", "noopener,noreferrer")
          }
          role={item.url ? "link" : undefined}
          tabIndex={item.url ? 0 : undefined}
        >
          <div className="relative flex min-h-0 flex-1 items-center justify-center p-3">
            <img
              src={item.img}
              alt={item.title ?? ""}
              className="max-h-full max-w-full object-contain object-center"
              draggable={false}
            />
            <div className="halftone-overlay pointer-events-none absolute inset-3 opacity-20" />
            {colorShiftOnHover && (
              <div className="color-overlay pointer-events-none absolute inset-3 opacity-0 accent-gradient" />
            )}
          </div>

          {item.title && (
            <div className="shrink-0 border-t border-stroke/50 bg-surface/80 px-4 py-3 backdrop-blur-sm">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-primary">
                {item.title}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
