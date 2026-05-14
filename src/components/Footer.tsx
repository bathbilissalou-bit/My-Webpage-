import { useState } from "react";
import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";

const EMAIL = "havreplacide@gmail.com";

function EmailLink({ label }: { label: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Always let mailto fire; also copy as a fallback
    if (navigator.clipboard) {
      navigator.clipboard.writeText(EMAIL).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {/* silent — mailto still fires */});
    }
    // Do NOT preventDefault — let the browser open the mail client
  };

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <a
        href={`mailto:${EMAIL}`}
        aria-label="Email HavrePlacide"
        rel="noopener noreferrer"
        onClick={handleClick}
        style={{
          color: "var(--text-muted)",
          fontSize: "0.82rem",
          transition: "color 0.2s",
          cursor: "pointer",
          display: "inline-block",
          /* Ensure generous tap target on mobile */
          minHeight: 32,
          lineHeight: "32px",
          paddingRight: 4,
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
          pointerEvents: "auto",
          userSelect: "none",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
      >
        {label}
      </a>
      {copied && (
        <span style={{
          position: "absolute",
          left: "calc(100% + 8px)",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "0.6rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--gold)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          animation: "fade-in-out 2s ease forwards",
        }}>
          ✓ Copied
        </span>
      )}
    </span>
  );
}

export function Footer() {
  const { lang } = useLang();

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
        ["Instagram",            "https://instagram.com/havreplacide"],
        ["Facebook",             "https://facebook.com/Havrplacide"],
        ["TikTok",               "https://tiktok.com/@haveplacide"],
        [t.footer.emailUs[lang], "mailto:havreplacide@gmail.com"],
      ],
    },
  ];

  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "60px 40px" }}>
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
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>{col.title}</div>
              {col.links.map(([label, href]) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  {href.startsWith("mailto:") ? (
                    <EmailLink label={label} />
                  ) : (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{ color: "var(--text-muted)", fontSize: "0.82rem", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      {label}
                    </a>
                  )}
                </div>
              ))}
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
        @keyframes fade-in-out {
          0%   { opacity: 0; transform: translateY(calc(-50% - 4px)); }
          15%  { opacity: 1; transform: translateY(-50%); }
          75%  { opacity: 1; transform: translateY(-50%); }
          100% { opacity: 0; transform: translateY(-50%); }
        }
      `}</style>
    </footer>
  );
}
