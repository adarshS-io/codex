import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/architecture", label: "Architecture" },
  { to: "/demo", label: "Live Demo" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

const SiteLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container flex items-center justify-between gap-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-elegant">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold tracking-tight">CarbonTwin</span>
              <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                SIH · Bangalore Edition
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button asChild size="sm">
              <Link to="/demo">Launch Twin →</Link>
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="grid h-9 w-9 place-items-center rounded-md border border-border lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border lg:hidden">
            <nav className="container flex flex-col py-2">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-secondary"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Button asChild size="sm" className="mt-2">
                <Link to="/demo" onClick={() => setOpen(false)}>
                  Launch Twin →
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 bg-card/30">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} CarbonTwin · Built for Smart India Hackathon</p>
          <p>Bangalore · Urban CO₂ Digital Twin Project</p>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;