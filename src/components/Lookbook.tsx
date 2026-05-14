import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";
import { useImageViewer, ViewerImage } from "@/context/ImageViewerContext";

const lookImages: ViewerImage[] = [
  { src: "/img-couple-navy.jpeg",      alt: "His & Hers, Navy Elegance",  label: "SS 2025" },
  { src: "/img-man-grey-outdoor.jpeg", alt: "The Grey Linen Look",        label: "SS 2025" },
  { src: "/img-man-navy-seated.jpeg",  alt: "Navy Relaxed Tailoring",     label: "SS 2025" },
  { src: "/img-sage-detail.jpg",       alt: "Sage Detail Close-up",       label: "SS 2025" },
  { src: "/img-green-detail.jpg",      alt: "Forest Green Close-up",      label: "SS 2025" },
];

const imgStyle: React.CSSProperties = {
  width: "100%", height: "100%", objectFit: "cover", display: "block",
  pointerEvents: "none",
};

export function Lookbook() {
  const { lang } = useLang();
  const { open } = useImageViewer();

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
          <div
            className="look-tile"
            style={{ gridRow: "span 2", position: "relative", aspectRatio: "2/3", border: "1px solid var(--border)", overflow: "hidden", cursor: "zoom-in" }}
            onClick={() => open(lookImages, 0)}
            onContextMenu={e => e.preventDefault()}
          >
            <img src={lookImages[0].src} alt={lookImages[0].alt} draggable={false} style={imgStyle} />
            <div className="look-overlay" />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", pointerEvents: "none" }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>{lookImages[0].label}</div>
              <div className="serif" style={{ fontSize: "1.5rem", fontWeight: 300, fontStyle: "italic", color: "#fff" }}>{t.lookbook.looks[0].title[lang]}</div>
            </div>
          </div>

          {lookImages.slice(1).map((look, i) => (
            <div
              key={i}
              className="look-tile"
              style={{ position: "relative", aspectRatio: "3/4", border: "1px solid var(--border)", overflow: "hidden", cursor: "zoom-in" }}
              onClick={() => open(lookImages, i + 1)}
              onContextMenu={e => e.preventDefault()}
            >
              <img src={look.src} alt={look.alt} draggable={false} style={imgStyle} />
              <div className="look-overlay" />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", pointerEvents: "none" }}>
                <div style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{look.label}</div>
                <div className="serif" style={{ fontSize: "1rem", fontWeight: 300, fontStyle: "italic", color: "#fff" }}>{t.lookbook.looks[i + 1].title[lang]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .look-tile { user-select: none; }
        .look-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.3s;
          pointer-events: none;
        }
        .look-tile:hover .look-overlay { background: rgba(0,0,0,0.18); }
        .look-tile:hover::after {
          content: "⊕";
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem; color: var(--gold);
          opacity: 0.9; pointer-events: none;
        }
      `}</style>
    </section>
  );
}
