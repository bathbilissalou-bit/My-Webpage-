export function About() {
  return (
    <section id="about" style={{ background: "var(--bg-2)", padding: "100px 40px" }}>
      <div className="section-inner about-grid">

        <div>
          <p className="section-label">Notre Histoire</p>
          <h2 className="section-title">Born From a Vision of Timeless African Style</h2>
          <div className="divider" />
          <p style={{ color: "var(--text-muted)", lineHeight: 1.95, marginBottom: 24, fontSize: "0.9rem" }}>
            HavrePlacide was born from a deep reverence for African craftsmanship and a desire to bring its richness into contemporary wardrobes. Every stitch carries heritage; every silhouette tells a story.
          </p>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.95, fontSize: "0.9rem" }}>
            We design with intention — garments, shoes, and accessories made to move with you through life's most significant moments. What you wear is an extension of who you are.
          </p>

          <div className="about-stats" style={{ marginTop: 48, display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[["2020", "Founded"], ["100+", "Pieces Made"], ["50+", "Happy Clients"]].map(([num, label]) => (
              <div key={label}>
                <div className="serif" style={{ fontSize: "2.5rem", fontWeight: 300, color: "var(--gold)", fontStyle: "italic" }}>{num}</div>
                <div style={{ fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48 }}>
            <a href="#process" className="btn-primary">See How We Work</a>
          </div>
        </div>

        {/* Real photo */}
        <div style={{
          position: "relative",
          aspectRatio: "3/4",
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}>
          <img
            src="/img-man-beige.jpeg"
            alt="HavrePlacide craftsmanship"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Overlay label */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "24px 28px",
            background: "linear-gradient(transparent, rgba(6,6,6,0.85))",
          }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Artisan</div>
            <div className="serif" style={{ fontSize: "1.1rem", fontWeight: 300, fontStyle: "italic", color: "var(--text)" }}>Made by hand. Worn with pride.</div>
          </div>
          {/* Corner ornament */}
          <div style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderTop: "1px solid var(--gold)", borderRight: "1px solid var(--gold)", opacity: 0.7 }} />
          <div style={{ position: "absolute", bottom: 80, left: 16, width: 32, height: 32, borderBottom: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)", opacity: 0.7 }} />
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 48px; }
          .about-grid > div:last-child { aspect-ratio: 4/3 !important; }
          .about-stats { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}
