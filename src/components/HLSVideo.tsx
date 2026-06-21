import { useEffect, useRef } from "react";
import Hls from "hls.js";

const HLS_SOURCE =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

interface HLSVideoProps {
  className?: string;
  flipped?: boolean;
}

export default function HLSVideo({ className = "", flipped = false }: HLSVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(HLS_SOURCE);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SOURCE;
    }

    return () => {
      hls?.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className={`absolute top-1/2 left-1/2 min-h-full min-w-full object-cover -translate-x-1/2 -translate-y-1/2 ${flipped ? "scale-y-[-1]" : ""} ${className}`}
    />
  );
}
