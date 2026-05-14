import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";
import { useStaggerReveal } from "@/hooks/useScrollReveal";

const icons = ["✦", "◈", "◇"];

export function WhyCustom() {
  const { lang } = useLang();
  const gridRef = useStaggerReveal<HTMLDivElement>(120);
  return (
    <section id="why" style={{ background: "var(--bg-2)", padding: "100px 40px", position: "relative" }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(201,169,110,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="section-inner" style={{ position: "relative" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 80 }}>
          <p className="section-label">{t.whyCustom.label[lang]}</p>
          <h2 className="section-title" style={{ fontStyle: "italic" }}>{t.whyCustom.title[lang]}</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "24px auto 32px" }}>
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
            <div style={{ width: 6, height: 6, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", maxWidth: 520, margin: "0 auto", lineHeight: 1.9 }}>
            {t.whyCustom.sub[lang]}
          </p>
        </div>

        <div ref={gridRef} className="why-grid">
          {t.whyCustom.benefits.map((b, i) => (
            <div key={i} className="why-card reveal" style={{
              position: "relative", padding: "48px 36px",
              border: "1px solid var(--border)", background: "var(--bg)",
              transition: "border-color 0.35s", textAlign: "center",
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
              {(["tl","tr","bl","br"] as const).map(pos => (
                <span key={pos} style={{
                  position: "absolute", width: 12, height: 12,
                  top: pos.startsWith("t") ? -1 : "auto",
                  bottom: pos.startsWith("b") ? -1 : "auto",
                  left: pos.endsWith("l") ? -1 : "auto",
                  right: pos.endsWith("r") ? -1 : "auto",
                  borderTop: pos.startsWith("t") ? "2px solid var(--gold)" : "none",
                  borderBottom: pos.startsWith("b") ? "2px solid var(--gold)" : "none",
                  borderLeft: pos.endsWith("l") ? "2px solid var(--gold)" : "none",
                  borderRight: pos.endsWith("r") ? "2px solid var(--gold)" : "none",
                  opacity: 0, transition: "opacity 0.35s",
                }} className="card-corner" />
              ))}
              <div className="serif" style={{ fontSize: "2.8rem", color: "var(--gold)", lineHeight: 1, marginBottom: 24, fontWeight: 300 }}>
                {icons[i]}
              </div>
              <h3 className="serif" style={{ fontSize: "1.6rem", fontWeight: 300, color: "var(--text)", marginBottom: 4, fontStyle: "italic" }}>
                {b.title[lang]}
              </h3>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 24 }}>
                {b.subtitle[lang]}
              </div>
              <div style={{ width: 32, height: 1, background: "var(--border)", margin: "0 auto 24px" }} />
              <p style={{ color: "var(--text-muted)", fontSize: "0.84rem", lineHeight: 1.9 }}>
                {b.desc[lang]}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 72 }}>
          <a href="#atelier" className="btn-primary">{t.whyCustom.cta[lang]}</a>
        </div>
      </div>

      <style>{`
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .why-card:hover .card-corner { opacity: 1 !important; }
        @media (max-width: 768px) { .why-grid { grid-template-columns: 1fr; gap: 20px; } }
      `}</style>
    </section>
  );
}
