import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";

export function Hero() {
  const { lang } = useLang();
  return (
    <section id="home" style={{
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      overflow: "hidden",
      padding: "0 40px",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/img-couple-navy.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(6,6,6,0.72) 0%, rgba(6,6,6,0.55) 50%, rgba(6,6,6,0.88) 100%)",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: "repeating-linear-gradient(90deg,#c9a96e 0,#c9a96e 10px,transparent 10px,transparent 18px,#7a5c30 18px,#7a5c30 24px,transparent 24px,transparent 32px)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "18%", left: "8%", width: 1, height: "28%", background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.4), transparent)" }} />
        <div style={{ position: "absolute", top: "18%", right: "8%", width: 1, height: "28%", background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.4), transparent)" }} />
      </div>

      <div style={{ position: "relative", maxWidth: 760, zIndex: 1 }}>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.55em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 28 }}>
          {t.hero.eyebrow[lang]}
        </p>
        <h1 className="serif" style={{
          fontSize: "clamp(3.2rem, 10vw, 7.5rem)",
          fontWeight: 300, lineHeight: 0.95,
          color: "#f5f0e8",
          marginBottom: 28,
          fontStyle: "italic",
          textShadow: "0 2px 40px rgba(0,0,0,0.5)",
        }}>
          HavrePlacide
        </h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 28 }}>
          <div style={{ width: 48, height: 1, background: "var(--gold)", opacity: 0.7 }} />
          <div style={{ width: 6, height: 6, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
          <div style={{ width: 48, height: 1, background: "var(--gold)", opacity: 0.7 }} />
        </div>
        <p style={{ fontSize: "0.78rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(240,236,228,0.75)", marginBottom: 20 }}>
          {t.hero.sub[lang]}
        </p>
        <p style={{ fontSize: "0.9rem", color: "rgba(240,236,228,0.6)", lineHeight: 1.85, maxWidth: 480, margin: "0 auto 56px", fontWeight: 300 }}>
          {t.hero.body[lang]}
        </p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#shop" className="btn-primary">{t.hero.cta1[lang]}</a>
          <a href="#process" style={{
            border: "1px solid rgba(240,236,228,0.35)",
            color: "rgba(240,236,228,0.75)",
            padding: "14px 32px",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            display: "inline-block",
            transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(240,236,228,0.35)"; e.currentTarget.style.color = "rgba(240,236,228,0.75)"; }}>
            {t.hero.cta2[lang]}
          </a>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      }}>
        <div style={{ fontSize: "0.55rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>{t.hero.scroll[lang]}</div>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--gold), transparent)", opacity: 0.6 }} />
      </div>
    </section>
  );
}
