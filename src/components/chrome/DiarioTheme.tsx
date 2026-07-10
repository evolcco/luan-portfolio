"use client";

import { useEffect } from "react";

/**
 * Marks the diário space so `:root[data-space="diario"]` can re-theme the whole
 * site (ground, grid, footer) to a deep blue. Set after mount and cleared on
 * leave; the body's background transition makes the shift a soft entrance.
 */
export function DiarioTheme({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.space = "diario";
    return () => {
      delete root.dataset.space;
    };
  }, []);
  return <>{children}</>;
}
