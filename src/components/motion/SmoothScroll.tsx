"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

/**
 * Lenis momentum scroll on the window (root mode — never wrapper mode, which would
 * transform a container and desync .grid-bg + the Display cap-fit's clientWidth reads).
 * Off under reduced-motion and on coarse pointers (native touch scroll).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    setOn(!reduce && !coarse);
  }, []);

  if (!on) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.09, duration: 1.1, smoothWheel: true, syncTouch: false, anchors: true }}
    >
      {children}
    </ReactLenis>
  );
}
