"use client";

import { useState } from "react";

const FALLBACK = "/adalchemy-photo-fallback.svg";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function SafeImage({ src, alt, className }: SafeImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const current = failedSrc === src ? FALLBACK : src;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (current !== FALLBACK) setFailedSrc(src);
      }}
    />
  );
}
