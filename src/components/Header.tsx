import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/portfolio", label: "Portfolio" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ivory/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-baseline justify-between px-6 py-5 md:px-10">
        <Link to="/" className="display text-2xl md:text-3xl leading-none">
          Eve Gomy
        </Link>
        <nav className="flex gap-6 md:gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "link-underline text-sm tracking-wider",
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
