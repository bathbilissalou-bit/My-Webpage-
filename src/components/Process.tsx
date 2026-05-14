import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";
import { useStaggerReveal } from "@/hooks/useScrollReveal";

export function Process() {
  const { lang } = useLang();
  const stepsRef = useStaggerReveal<HTMLDivElement>(110);
  return (
    <section id="process" style={{ background: "var(--bg)", padding: "100px 40px", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
        background: "repeating-linear-gradient(90deg,var(--gold) 0,var(--gold) 8px,transparent 8px,transparent 16px,#7a5c30 16px,#7a5c30 22px,transparent 22px,transparent 30px)",
        opacity: 0.35,
      }} />

      <div className="section-inner">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 80 }}>
          <p className="section-label">{t.process.label[lang]}</p>
          <h2 className="section-title" style={{ fontStyle: "italic" }}>{t.process.title[lang]}</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "24px auto 0" }}>
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
            <div style={{ width: 6, height: 6, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
          </div>
        </div>

        <div ref={stepsRef} className="process-steps">
          {t.process.steps.map((step, i) => (
            <div key={i} className="process-step reveal" style={{ position: "relative" }}>
              {i < t.process.steps.length - 1 && (
                <div className="step-connector" aria-hidden />
              )}
              <div style={{
                width: 64, height: 64,
                border: "1px solid var(--gold)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px", position: "relative", flexShrink: 0,
              }}>
                <div style={{ position: "absolute", top: -3, left: -3, width: 8, height: 8, borderTop: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)" }} />
                <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderTop: "2px solid var(--gold)", borderRight: "2px solid var(--gold)" }} />
                <div style={{ position: "absolute", bottom: -3, left: -3, width: 8, height: 8, borderBottom: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)" }} />
                <div style={{ position: "absolute", bottom: -3, right: -3, width: 8, height: 8, borderBottom: "2px solid var(--gold)", borderRight: "2px solid var(--gold)" }} />
                <span className="serif" style={{ fontSize: "1.4rem", fontWeight: 300, color: "var(--gold)", fontStyle: "italic" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 400, color: "var(--text)", marginBottom: 16, lineHeight: 1.2 }}>
                {step.title[lang]}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.85 }}>
                {step.desc[lang]}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 72 }}>
          <a href="#measurements" className="btn-primary">{t.process.cta[lang]}</a>
        </div>
      </div>

      <style>{`
        .process-steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; position: relative; }
        .process-step { text-align: center; padding: 0 24px 0; }
        .step-connector {
          position: absolute; top: 32px;
          left: calc(50% + 32px); right: calc(-50% + 32px);
          height: 1px; background: linear-gradient(to right, var(--gold), var(--border)); opacity: 0.5;
        }
        @media (max-width: 900px) {
          .process-steps { grid-template-columns: 1fr 1fr; gap: 48px 32px; }
          .step-connector { display: none; }
        }
        @media (max-width: 520px) { .process-steps { grid-template-columns: 1fr; gap: 48px; } }
      `}</style>
    </section>
  );
}
