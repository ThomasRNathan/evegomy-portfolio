import { useEffect, useRef } from "react";

/**
 * Custom cursor — small ink dot that follows the mouse and expands
 * to a soft halo when hovering interactive elements. Disabled on
 * touch devices and respects prefers-reduced-motion.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduceMotion) return;

    document.body.classList.add("has-custom-cursor");

    const cursor = ref.current!;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const animate = () => {
      x += (tx - x) * 0.25;
      y += (ty - y) * 0.25;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };
    let raf = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      cursor.dataset.state = "default";
    };
    const onLeave = () => {
      cursor.dataset.state = "hidden";
    };
    const onEnter = () => {
      cursor.dataset.state = "default";
    };

    const hoverSelector = 'a, button, [role="button"], input, textarea, select, label';
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest(hoverSelector)) cursor.dataset.state = "hover";
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest(hoverSelector)) cursor.dataset.state = "default";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return <div ref={ref} className="eg-cursor" data-state="default" aria-hidden />;
}
