import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";

const lookImages = [
  { src: "/img-couple-navy.jpeg",    alt: "His & Hers, Navy Elegance",  label: "SS 2025" },
  { src: "/img-man-grey-outdoor.jpeg", alt: "The Grey Linen Look",       label: "SS 2025" },
  { src: "/img-man-navy-seated.jpeg",  alt: "Navy Relaxed Tailoring",    label: "SS 2025" },
  { src: "/img-sage-detail.jpg",       alt: "Sage Detail Close-up",      label: "SS 2025" },
  { src: "/img-green-detail.jpg",      alt: "Forest Green Close-up",     label: "SS 2025" },
];

export function Lookbook() {
  const { lang } = useLang();
  return (
    <section id="lookbook" style={{ background: "var(--bg-2)", padding: "100px 40px" }}>
      <div className="section-inner">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
          <div>
            <p className="section-label">{t.lookbook.label[lang]}</p>
            <h2 className="section-title" style={{ marginBottom: 0 }}>{t.lookbook.title[lang]}</h2>
          </div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            {t.lookbook.season[lang]}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "auto auto", gap: 16, marginBottom: 16 }}>
          {/* Featured large */}
          <div style={{ gridRow: "span 2", position: "relative", aspectRatio: "2/3", border: "1px solid var(--border)", overflow: "hidden" }}>
            <img src={lookImages[0].src} alt={lookImages[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>{lookImages[0].label}</div>
              <div className="serif" style={{ fontSize: "1.5rem", fontWeight: 300, fontStyle: "italic", color: "#fff" }}>{t.lookbook.looks[0].title[lang]}</div>
            </div>
          </div>
          {lookImages.slice(1).map((look, i) => (
            <div key={i} style={{ position: "relative", aspectRatio: "3/4", border: "1px solid var(--border)", overflow: "hidden" }}>
              <img src={look.src} alt={look.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}>
                <div style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{look.label}</div>
                <div className="serif" style={{ fontSize: "1rem", fontWeight: 300, fontStyle: "italic", color: "#fff" }}>{t.lookbook.looks[i + 1].title[lang]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
