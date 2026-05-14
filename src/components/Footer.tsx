export function Footer() {
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "60px 40px" }}>
      <div className="section-inner">
        <div className="footer-grid" style={{ marginBottom: 60 }}>
          <div>
            <div className="serif" style={{ fontSize: "1.5rem", fontWeight: 300, marginBottom: 16, letterSpacing: "0.1em" }}>HavrePlacide</div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.8, maxWidth: 260 }}>
              A brand that resonates with your style. Crafting timeless pieces for those who wear their story.
            </p>
          </div>
          {[
            { title: "Navigate", links: [["Home","#home"],["About","#about"],["Collection","#shop"],["Lookbook","#lookbook"],["Process","#process"],["Contact","#contact"]] },
            { title: "Services", links: [["Custom Orders","#contact"],["Alterations","#contact"],["Consultations","#contact"],["Styling","#contact"]] },
            { title: "Connect", links: [["Instagram","https://instagram.com/havreplacide"],["Facebook","https://facebook.com/Havrplacide"],["TikTok","https://tiktok.com/@haveplacide"],["Email Us","mailto:havreplacide@gmail.com"]] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>{col.title}</div>
              {col.links.map(([label, href]) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <a href={href} style={{ color: "var(--text-muted)", fontSize: "0.82rem", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                    {label}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.2em" }}>
            © 2024 HavrePlacide LLC. All rights reserved.
          </div>
          <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.2em" }}>
            Wear Your Story.
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
        }
        @media (max-width: 768px) {
          footer { padding: 48px 24px; }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </footer>
  );
}
