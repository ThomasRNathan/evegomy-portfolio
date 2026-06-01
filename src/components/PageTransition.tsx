import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

/**
 * Tiny page transition wrapper — re-keys on path change so each
 * route mount runs the fade-in animation defined in tailwind.config.ts.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-fade-in">
      {children}
    </div>
  );
}
