import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

const navLinks = [
  { name: "Home",         href: "#home" },
  { name: "About",        href: "#about" },
  { name: "Collection",   href: "#shop" },
  { name: "Lookbook",     href: "#lookbook" },
  { name: "Process",      href: "#process" },
  { name: "Sur-Mesure",   href: "#why" },
  { name: "Measurements", href: "#measurements" },
  { name: "Contact",      href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "all 0.5s ease",
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        padding: scrolled ? "14px 0" : "22px 0",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(true)} className="mobile-menu-btn"
            style={{ display: "none", background: "none", border: "none", color: "var(--text)", cursor: "pointer" }}>
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Left links */}
          <div style={{ display: "flex", gap: 28, flex: 1, alignItems: "center" }} className="desktop-links">
            {navLinks.slice(0, 4).map(l => (
              <a key={l.name} href={l.href}
                style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)", transition: "color 0.3s", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                {l.name}
              </a>
            ))}
          </div>

          {/* Logo */}
          <div style={{ textAlign: "center", flex: "0 0 auto", padding: "0 24px" }}>
            <a href="#home" className="serif"
              style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.12em", color: "var(--text)", whiteSpace: "nowrap" }}>
              HavrePlacide
            </a>
            {!scrolled && (
              <div style={{ fontSize: "0.52rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 4 }}>
                Créations Sur-Mesure
              </div>
            )}
          </div>

          {/* Right links */}
          <div style={{ display: "flex", gap: 28, flex: 1, justifyContent: "flex-end", alignItems: "center" }} className="desktop-links">
            {navLinks.slice(4).map(l => (
              <a key={l.name} href={l.href}
                style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)", transition: "color 0.3s", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                {l.name}
              </a>
            ))}
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", position: "relative", flexShrink: 0 }}>
              <ShoppingBag size={17} strokeWidth={1.5} />
              <span style={{ position: "absolute", top: -6, right: -6, background: "var(--gold)", color: "var(--bg)", fontSize: "0.52rem", width: 13, height: 13, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>0</span>
            </button>
          </div>

          {/* Mobile cart */}
          <button className="mobile-cart-btn"
            style={{ display: "none", background: "none", border: "none", color: "var(--text)", cursor: "pointer" }}>
            <ShoppingBag size={22} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "var(--bg)", display: "flex", flexDirection: "column" }}>
          {/* Kente top stripe */}
          <div aria-hidden style={{
            height: 3,
            background: "repeating-linear-gradient(90deg,var(--gold) 0,var(--gold) 8px,transparent 8px,transparent 16px,#7a5c30 16px,#7a5c30 22px,transparent 22px,transparent 30px)",
          }} />
          <div style={{ padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
            <span className="serif" style={{ fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.1em" }}>HavrePlacide</span>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer" }}>
              <X size={24} strokeWidth={1} />
            </button>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
            {navLinks.map((l, i) => (
              <a key={l.name} href={l.href} onClick={() => setOpen(false)}
                className="serif"
                style={{ fontSize: "1.8rem", fontWeight: 300, letterSpacing: "0.08em", color: i % 2 === 0 ? "var(--text)" : "var(--text-muted)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = i % 2 === 0 ? "var(--text)" : "var(--text-muted)")}>
                {l.name}
              </a>
            ))}
          </div>
          <div style={{ padding: "24px", textAlign: "center", borderTop: "1px solid var(--border)" }}>
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center" }}>
              Begin Your Commission
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-links { display: none !important; }
          .mobile-menu-btn, .mobile-cart-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
