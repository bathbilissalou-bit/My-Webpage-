import { useState, useEffect } from "react";
import { useLang } from "@/i18n/LangContext";

const STORAGE_KEY = "hp_welcomed";

const s = (en: string, fr: string, es: string) => ({ en, fr, es });

const CONTENT = {
  eyebrow:  s("Welcome", "Bienvenue", "Bienvenido"),
  title:    s("Bespoke Couture,\nCrafted for You.", "Couture Sur-Mesure,\nConçue pour Vous.", "Costura a Medida,\nCreada para Usted."),
  body:     s(
    "HavrePlacide creates handcrafted garments tailored to your precise measurements and aesthetic vision. Explore our collection, configure your commission, and experience the art of true bespoke.",
    "HavrePlacide crée des vêtements artisanaux taillés selon vos mesures précises et votre vision esthétique. Explorez notre collection, configurez votre commande, et vivez l'art du sur-mesure authentique.",
    "HavrePlacide crea prendas artesanales confeccionadas según sus medidas precisas y visión estética. Explore nuestra colección, configure su pedido y experimente el arte de la costura a medida."
  ),
  steps: [
    s("Browse & configure your piece in the Shop", "Parcourez et configurez votre pièce en Boutique", "Explore y configure su pieza en la Tienda"),
    s("Submit your measurements & book a fitting", "Soumettez vos mesures & réservez un essayage", "Envíe sus medidas y reserve una prueba"),
    s("Receive your handcrafted creation", "Recevez votre création artisanale", "Reciba su creación artesanal"),
  ],
  begin: s("Begin the Experience", "Commencer l'Expérience", "Comenzar la Experiencia"),
  skip:  s("Skip Introduction", "Passer l'Introduction", "Omitir Introducción"),
};

export function OnboardingWelcome() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Small delay so the page renders first
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    if (leaving) return;
    setLeaving(true);
    localStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setVisible(false), 480);
  };

  if (!visible) return null;

  const titleLines = CONTENT.title[lang].split("\n");

  return (
    <>
      <div
        className={`onboarding-overlay${leaving ? " onboarding-overlay--out" : ""}`}
        onClick={dismiss}
        aria-modal="true"
        role="dialog"
      />
      <div className={`onboarding-panel${leaving ? " onboarding-panel--out" : ""}`}>
        {/* Gold corner accents */}
        <div style={{ position: "absolute", top: 20, left: 20, width: 24, height: 24, borderTop: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)" }} />
        <div style={{ position: "absolute", top: 20, right: 20, width: 24, height: 24, borderTop: "1px solid var(--gold)", borderRight: "1px solid var(--gold)" }} />
        <div style={{ position: "absolute", bottom: 20, left: 20, width: 24, height: 24, borderBottom: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)" }} />
        <div style={{ position: "absolute", bottom: 20, right: 20, width: 24, height: 24, borderBottom: "1px solid var(--gold)", borderRight: "1px solid var(--gold)" }} />

        {/* Eyebrow */}
        <p style={{ fontSize: "0.58rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 28, textAlign: "center" }}>
          {CONTENT.eyebrow[lang]}
        </p>

        {/* Gold diamond */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <div style={{ width: 14, height: 14, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          color: "var(--text)",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 28,
        }}>
          {titleLines.map((line, i) => (
            <span key={i} style={{ display: "block" }}>{line}</span>
          ))}
        </h2>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", marginBottom: 32 }}>
          <div style={{ width: 40, height: 1, background: "var(--gold)" }} />
          <div style={{ width: 5, height: 5, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
          <div style={{ width: 40, height: 1, background: "var(--gold)" }} />
        </div>

        {/* Body */}
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.85, textAlign: "center", marginBottom: 40, maxWidth: 400, margin: "0 auto 40px" }}>
          {CONTENT.body[lang]}
        </p>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 44 }}>
          {CONTENT.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 28, height: 28, border: "1px solid var(--gold)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.85rem", color: "var(--gold)", fontWeight: 300,
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                {step[lang]}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <button
            onClick={dismiss}
            className="btn-primary"
            style={{ width: "100%", maxWidth: 320 }}
          >
            {CONTENT.begin[lang]}
          </button>
          <button
            onClick={dismiss}
            style={{
              background: "transparent", border: "none",
              color: "var(--text-dim)", fontSize: "0.65rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              cursor: "pointer", padding: "8px 16px",
              fontFamily: "inherit",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-muted)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
          >
            {CONTENT.skip[lang]}
          </button>
        </div>
      </div>

      <style>{`
        .onboarding-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          z-index: 11000;
          backdrop-filter: blur(4px);
          animation: onb-fade-in 0.5s ease forwards;
        }
        .onboarding-overlay--out {
          animation: onb-fade-out 0.45s ease forwards;
        }
        .onboarding-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1);
          z-index: 11001;
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 56px 48px;
          width: min(560px, calc(100vw - 32px));
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          animation: onb-slide-in 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .onboarding-panel--out {
          animation: onb-slide-out 0.45s ease forwards;
        }
        @keyframes onb-fade-in  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes onb-fade-out { from { opacity: 1 } to { opacity: 0 } }
        @keyframes onb-slide-in {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 24px)) scale(0.97); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes onb-slide-out {
          from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          to   { opacity: 0; transform: translate(-50%, calc(-50% - 16px)) scale(0.97); }
        }
        @media (max-width: 480px) {
          .onboarding-panel { padding: 40px 28px; }
        }
      `}</style>
    </>
  );
}
