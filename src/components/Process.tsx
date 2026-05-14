const steps = [
  {
    num: "01",
    title: "Choose Your Style",
    desc: "Browse our collection of African-inspired silhouettes — tuniques, boubous, shirts, shoes, and accessories — and select what speaks to you.",
  },
  {
    num: "02",
    title: "Share Your Measurements",
    desc: "Use our AI-powered measurement tool or follow our simple guide. Every dimension is captured so your piece fits like it was born for your body.",
  },
  {
    num: "03",
    title: "Select Your Fabric",
    desc: "Choose from premium materials — wax print, kente, hand-woven linen, silk blends. We source ethically from African artisan communities.",
  },
  {
    num: "04",
    title: "We Craft Your Piece",
    desc: "Our artisans handcraft every detail with care and precision. No shortcuts — only the time it takes to do it right.",
  },
  {
    num: "05",
    title: "Delivered to Your Door",
    desc: "Your one-of-a-kind creation arrives beautifully packaged, ready to wear and made to last a lifetime.",
  },
];

export function Process() {
  return (
    <section id="process" style={{ background: "var(--bg)", padding: "100px 40px", position: "relative", overflow: "hidden" }}>

      {/* Kente strip bottom */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
        background: "repeating-linear-gradient(90deg,var(--gold) 0,var(--gold) 8px,transparent 8px,transparent 16px,#7a5c30 16px,#7a5c30 22px,transparent 22px,transparent 30px)",
        opacity: 0.35,
      }} />

      <div className="section-inner">
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p className="section-label">Comment ça marche</p>
          <h2 className="section-title" style={{ fontStyle: "italic" }}>The Sur-Mesure Process</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "24px auto 0" }}>
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
            <div style={{ width: 6, height: 6, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
          </div>
        </div>

        {/* Steps */}
        <div className="process-steps">
          {steps.map((step, i) => (
            <div key={step.num} className="process-step" style={{ position: "relative" }}>

              {/* Connector line (not last) */}
              {i < steps.length - 1 && (
                <div className="step-connector" aria-hidden />
              )}

              {/* Number circle */}
              <div style={{
                width: 64, height: 64,
                border: "1px solid var(--gold)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px",
                position: "relative",
                flexShrink: 0,
              }}>
                {/* Corner accents on circle-box */}
                <div style={{ position: "absolute", top: -3, left: -3, width: 8, height: 8, borderTop: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)" }} />
                <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderTop: "2px solid var(--gold)", borderRight: "2px solid var(--gold)" }} />
                <div style={{ position: "absolute", bottom: -3, left: -3, width: 8, height: 8, borderBottom: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)" }} />
                <div style={{ position: "absolute", bottom: -3, right: -3, width: 8, height: 8, borderBottom: "2px solid var(--gold)", borderRight: "2px solid var(--gold)" }} />
                <span className="serif" style={{ fontSize: "1.4rem", fontWeight: 300, color: "var(--gold)", fontStyle: "italic" }}>{step.num}</span>
              </div>

              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.15rem", fontWeight: 400,
                color: "var(--text)", marginBottom: 16, lineHeight: 1.2,
              }}>
                {step.title}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.85 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 72 }}>
          <a href="#measurements" className="btn-primary">Start My Measurements</a>
        </div>
      </div>

      <style>{`
        .process-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          position: relative;
        }
        .process-step {
          text-align: center;
          padding: 0 24px 0;
        }
        .step-connector {
          position: absolute;
          top: 32px;
          left: calc(50% + 32px);
          right: calc(-50% + 32px);
          height: 1px;
          background: linear-gradient(to right, var(--gold), var(--border));
          opacity: 0.5;
        }
        @media (max-width: 900px) {
          .process-steps {
            grid-template-columns: 1fr 1fr;
            gap: 48px 32px;
          }
          .step-connector { display: none; }
        }
        @media (max-width: 520px) {
          .process-steps { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
    </section>
  );
}
