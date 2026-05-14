import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";

const EMAIL = "havreplacide@gmail.com";

// ── Email contact modal ──────────────────────────────────────────────────────
function EmailModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleOpenMailApp = () => {
    window.location.href = `mailto:${EMAIL}`;
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(EMAIL).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }).catch(() => {
        // Fallback for browsers that block clipboard API
        const ta = document.createElement("textarea");
        ta.value = EMAIL;
        ta.style.cssText = "position:fixed;left:-9999px;top:-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const modal = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        // Backdrop — pointer-events explicitly enabled
        pointerEvents: "auto",
      }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label="Contact by email"
    >
      {/* Backdrop */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.80)",
        backdropFilter: "blur(4px)",
      }} />

      {/* Panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#0a0a0a",
          border: "1px solid #2a2a2a",
          padding: "44px 40px",
          width: "100%",
          maxWidth: 420,
          pointerEvents: "auto",
        }}
      >
        {/* Gold corner accents */}
        {[
          { top: 14, left:  14, borderTop: "1px solid #c9a96e", borderLeft:  "1px solid #c9a96e" },
          { top: 14, right: 14, borderTop: "1px solid #c9a96e", borderRight: "1px solid #c9a96e" },
          { bottom: 14, left:  14, borderBottom: "1px solid #c9a96e", borderLeft:  "1px solid #c9a96e" },
          { bottom: 14, right: 14, borderBottom: "1px solid #c9a96e", borderRight: "1px solid #c9a96e" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 16, height: 16, ...s }} />
        ))}

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: 16, right: 16,
            background: "transparent", border: "none",
            color: "#7a7570", fontSize: "1.1rem",
            cursor: "pointer", lineHeight: 1,
            padding: 6, fontFamily: "inherit",
          }}
        >
          ×
        </button>

        {/* Header */}
        <p style={{
          fontSize: "0.58rem", letterSpacing: "0.4em",
          textTransform: "uppercase", color: "#c9a96e",
          marginBottom: 20, textAlign: "center",
        }}>
          Contact
        </p>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.55rem", fontWeight: 300, fontStyle: "italic",
          color: "#f0ece4", textAlign: "center", marginBottom: 28, lineHeight: 1.2,
        }}>
          Get in Touch
        </p>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 28 }}>
          <div style={{ width: 32, height: 1, background: "#c9a96e" }} />
          <div style={{ width: 5, height: 5, border: "1px solid #c9a96e", transform: "rotate(45deg)" }} />
          <div style={{ width: 32, height: 1, background: "#c9a96e" }} />
        </div>

        {/* Email address display */}
        <div style={{
          background: "#111111", border: "1px solid #2a2a2a",
          padding: "16px 20px", marginBottom: 24, textAlign: "center",
        }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7a7570", marginBottom: 8 }}>
            Email Address
          </div>
          <div style={{ fontSize: "0.95rem", color: "#c9a96e", letterSpacing: "0.05em" }}>
            {EMAIL}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={handleOpenMailApp}
            style={{
              background: "#c9a96e",
              border: "1px solid #c9a96e",
              color: "#0a0a0a",
              padding: "14px 24px",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 500,
              transition: "opacity 0.2s",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            } as React.CSSProperties}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Open Email App
          </button>

          <button
            onClick={handleCopy}
            style={{
              background: "transparent",
              border: "1px solid #2a2a2a",
              color: copied ? "#c9a96e" : "#7a7570",
              padding: "14px 24px",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "border-color 0.2s, color 0.2s",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            } as React.CSSProperties}
            onMouseEnter={e => { if (!copied) { e.currentTarget.style.borderColor = "#c9a96e"; e.currentTarget.style.color = "#c9a96e"; } }}
            onMouseLeave={e => { if (!copied) { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#7a7570"; } }}
          >
            {copied ? "✓  Copied to Clipboard" : "Copy Email Address"}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

// ── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  const { lang } = useLang();
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const emailLabel = t.footer.emailUs[lang];

  const columns = [
    {
      title: t.footer.navTitle[lang],
      links: [
        [t.footer.home[lang],       "#home"],
        [t.footer.about[lang],      "#about"],
        [t.footer.collection[lang], "#shop"],
        [t.footer.lookbook[lang],   "#lookbook"],
        [t.footer.process[lang],    "#process"],
        [t.footer.contact[lang],    "#contact"],
      ],
    },
    {
      title: t.footer.servicesTitle[lang],
      links: [
        [t.footer.custom[lang],        "#contact"],
        [t.footer.alterations[lang],   "#contact"],
        [t.footer.consultations[lang], "#contact"],
        [t.footer.styling[lang],       "#contact"],
      ],
    },
    {
      title: t.footer.connectTitle[lang],
      links: [
        ["Instagram", "https://instagram.com/havreplacide"],
        ["Facebook",  "https://facebook.com/Havrplacide"],
        ["TikTok",    "https://tiktok.com/@haveplacide"],
      ],
    },
  ];

  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "60px 40px", position: "relative", zIndex: 1 }}>
      {emailModalOpen && <EmailModal onClose={() => setEmailModalOpen(false)} />}

      <div className="section-inner">
        <div className="footer-grid" style={{ marginBottom: 60 }}>
          <div>
            <div className="serif" style={{ fontSize: "1.5rem", fontWeight: 300, marginBottom: 16, letterSpacing: "0.1em" }}>HavrePlacide</div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.8, maxWidth: 260 }}>
              {t.footer.tagline[lang]}
            </p>
          </div>

          {columns.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
                {col.title}
              </div>
              {col.links.map(([label, href]) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{ color: "var(--text-muted)", fontSize: "0.82rem", transition: "color 0.2s", display: "inline-block" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {label}
                  </a>
                </div>
              ))}

              {/* Email Us button — only in the Connect column */}
              {col.title === t.footer.connectTitle[lang] && (
                <div style={{ marginBottom: 12 }}>
                  <button
                    onClick={() => setEmailModalOpen(true)}
                    aria-label="Email HavrePlacide"
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      color: "var(--text-muted)",
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontWeight: "inherit",
                      transition: "color 0.2s",
                      display: "inline-block",
                      touchAction: "manipulation",
                      WebkitTapHighlightColor: "transparent",
                      minHeight: 32,
                      lineHeight: "32px",
                    } as React.CSSProperties}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {emailLabel}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.2em" }}>
            {t.footer.copyright[lang]}
          </div>
          <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.2em" }}>
            {t.footer.wearYourStory[lang]}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
        @media (max-width: 768px) {
          footer { padding: 48px 24px; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }
      `}</style>
    </footer>
  );
}
