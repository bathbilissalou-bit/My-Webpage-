import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";
import { useImageViewer } from "@/context/ImageViewerContext";

export function About() {
  const { lang } = useLang();
  const { open } = useImageViewer();
  return (
    <section id="about" style={{ background: "var(--bg-2)", padding: "100px 40px" }}>
      <div className="section-inner about-grid">

        <div>
          <p className="section-label">{t.about.label[lang]}</p>
          <h2 className="section-title">{t.about.title[lang]}</h2>
          <div className="divider" />
          <p style={{ color: "var(--text-muted)", lineHeight: 1.95, marginBottom: 24, fontSize: "0.9rem" }}>
            {t.about.p1[lang]}
          </p>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.95, fontSize: "0.9rem" }}>
            {t.about.p2[lang]}
          </p>

          <div className="about-stats" style={{ marginTop: 48, display: "flex", gap: 48, flexWrap: "wrap" }}>
            {([
              ["2024", t.about.statFounded[lang]],
              ["100+", t.about.statPieces[lang]],
              ["50+",  t.about.statClients[lang]],
            ] as [string, string][]).map(([num, label]) => (
              <div key={label}>
                <div className="serif" style={{ fontSize: "2.5rem", fontWeight: 300, color: "var(--gold)", fontStyle: "italic" }}>{num}</div>
                <div style={{ fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48 }}>
            <a href="#process" className="btn-primary">{t.about.cta[lang]}</a>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            aspectRatio: "3/4",
            border: "1px solid var(--border)",
            overflow: "hidden",
            cursor: "zoom-in",
            userSelect: "none",
          }}
          onClick={() => open([{ src: "/img-hero-blue.jpg", alt: "HavrePlacide blue tunique portrait", label: "HavrePlacide" }], 0)}
          onContextMenu={e => e.preventDefault()}
        >
          <img
            src="/img-hero-blue.jpg"
            alt="HavrePlacide blue tunique portrait"
            draggable={false}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 8%",
              display: "block",
              filter: "brightness(0.94) contrast(1.06) saturate(0.9) sepia(0.08)",
              pointerEvents: "none",
            }}
            className="about-portrait"
          />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "24px 28px",
            background: "linear-gradient(transparent, rgba(6,6,6,0.85))",
          }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{t.about.artisan[lang]}</div>
            <div className="serif" style={{ fontSize: "1.1rem", fontWeight: 300, fontStyle: "italic", color: "var(--text)" }}>{t.about.artisanQuote[lang]}</div>
          </div>
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
          .about-portrait { object-position: center 12% !important; }
        }
      `}</style>
    </section>
  );
}
