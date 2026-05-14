const benefits = [
  {
    icon: "✦",
    title: "Coupe Parfaite",
    subtitle: "Perfect Fit",
    desc: "Every piece is made to your exact measurements. No more compromises — a garment that was built for your body, and yours alone.",
  },
  {
    icon: "◈",
    title: "Matières Premiums",
    subtitle: "Premium Materials",
    desc: "We source the finest fabrics from African artisan communities — wax print, kente, hand-loomed linen, and silk blends of exceptional quality.",
  },
  {
    icon: "◇",
    title: "Pièce Unique",
    subtitle: "One of a Kind",
    desc: "Your creation exists nowhere else in the world. A garment as singular as your identity — made with intention, worn with pride.",
  },
];

export function WhyCustom() {
  return (
    <section id="why" style={{ background: "var(--bg-2)", padding: "100px 40px", position: "relative" }}>

      {/* Background adinkra-inspired texture */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(201,169,110,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="section-inner" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p className="section-label">Pourquoi le Sur-Mesure</p>
          <h2 className="section-title" style={{ fontStyle: "italic" }}>Why Choose Custom?</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "24px auto 32px" }}>
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
            <div style={{ width: 6, height: 6, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", maxWidth: 520, margin: "0 auto", lineHeight: 1.9 }}>
            Ready-to-wear was never designed for you. Sur-mesure was.
          </p>
        </div>

        <div className="why-grid">
          {benefits.map((b) => (
            <div key={b.title} className="why-card" style={{
              position: "relative",
              padding: "48px 36px",
              border: "1px solid var(--border)",
              background: "var(--bg)",
              transition: "border-color 0.35s",
              textAlign: "center",
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>

              {/* Corner ornaments */}
              {(["tl","tr","bl","br"] as const).map(pos => (
                <span key={pos} style={{
                  position: "absolute",
                  width: 12, height: 12,
                  top: pos.startsWith("t") ? -1 : "auto",
                  bottom: pos.startsWith("b") ? -1 : "auto",
                  left: pos.endsWith("l") ? -1 : "auto",
                  right: pos.endsWith("r") ? -1 : "auto",
                  borderTop: pos.startsWith("t") ? "2px solid var(--gold)" : "none",
                  borderBottom: pos.startsWith("b") ? "2px solid var(--gold)" : "none",
                  borderLeft: pos.endsWith("l") ? "2px solid var(--gold)" : "none",
                  borderRight: pos.endsWith("r") ? "2px solid var(--gold)" : "none",
                  opacity: 0,
                  transition: "opacity 0.35s",
                }} className="card-corner" />
              ))}

              <div className="serif" style={{ fontSize: "2.8rem", color: "var(--gold)", lineHeight: 1, marginBottom: 24, fontWeight: 300 }}>
                {b.icon}
              </div>
              <h3 className="serif" style={{ fontSize: "1.6rem", fontWeight: 300, color: "var(--text)", marginBottom: 4, fontStyle: "italic" }}>
                {b.title}
              </h3>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 24 }}>
                {b.subtitle}
              </div>
              <div style={{ width: 32, height: 1, background: "var(--border)", margin: "0 auto 24px" }} />
              <p style={{ color: "var(--text-muted)", fontSize: "0.84rem", lineHeight: 1.9 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 72 }}>
          <a href="#contact" className="btn-primary">Begin Your Commission</a>
        </div>
      </div>

      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .why-card:hover .card-corner { opacity: 1 !important; }
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>
    </section>
  );
}
