import { useState } from "react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const Corner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => (
    <span style={{
      position: "absolute",
      width: 14, height: 14,
      top: pos.startsWith("t") ? -1 : "auto",
      bottom: pos.startsWith("b") ? -1 : "auto",
      left: pos.endsWith("l") ? -1 : "auto",
      right: pos.endsWith("r") ? -1 : "auto",
      borderTop: pos.startsWith("t") ? "2px solid var(--gold)" : "none",
      borderBottom: pos.startsWith("b") ? "2px solid var(--gold)" : "none",
      borderLeft: pos.endsWith("l") ? "2px solid var(--gold)" : "none",
      borderRight: pos.endsWith("r") ? "2px solid var(--gold)" : "none",
    }} />
  );

  const Diamond = () => (
    <div style={{ width: 6, height: 6, border: "1px solid var(--gold)", transform: "rotate(45deg)", flexShrink: 0 }} />
  );

  return (
    <section id="contact" style={{ background: "var(--bg)", padding: "100px 40px", position: "relative" }}>

      {/* Subtle Afro-geometric background accent */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "repeating-linear-gradient(90deg, var(--gold) 0px, var(--gold) 8px, transparent 8px, transparent 16px, var(--border) 16px, var(--border) 20px, transparent 20px, transparent 28px)",
        opacity: 0.4,
      }} />

      <div className="section-inner">

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title" style={{ fontStyle: "italic" }}>Contact Us</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "24px auto 32px" }}>
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
            <Diamond />
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.9, maxWidth: 500, margin: "0 auto" }}>
            Ready to order a custom piece, or have questions about our collection?<br />We'd love to hear from you.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="contact-grid">

          {/* Left: info panel */}
          <div style={{ position: "relative", padding: "40px 36px", border: "1px solid var(--border)", alignSelf: "start" }}>
            <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

            <p className="serif" style={{
              fontSize: "1.15rem", fontStyle: "italic", fontWeight: 300,
              color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 40,
              borderLeft: "2px solid var(--gold)", paddingLeft: 20,
            }}>
              "Every garment is a conversation between tradition and the present moment."
            </p>

            {[
              { label: "Email", value: "havreplacide@gmail.com", href: "mailto:havreplacide@gmail.com" },
              { label: "Phone", value: "+1 (646) 389-7810", href: "tel:+16463897810" },
              { label: "Instagram", value: "Havreplacide LLC", href: "https://instagram.com/havreplacide" },
              { label: "Facebook", value: "Havrplacide", href: "https://facebook.com/Havrplacide" },
              { label: "TikTok", value: "@haveplacide", href: "https://tiktok.com/@haveplacide" },
              { label: "Response Time", value: "Within 24 hours", href: null },
            ].map(({ label, value, href }, i, arr) => (
              <div key={label} style={{
                marginBottom: i < arr.length - 1 ? 28 : 0,
                paddingBottom: i < arr.length - 1 ? 28 : 0,
                borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Diamond />
                  <span style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>{label}</span>
                </div>
                {href ? (
                  <a href={href}
                    style={{ color: "var(--text-muted)", fontSize: "0.9rem", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                    {value}
                  </a>
                ) : (
                  <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{value}</div>
                )}
              </div>
            ))}
          </div>

          {/* Right: form */}
          <div>
            {status === "success" ? (
              <div style={{ position: "relative", padding: "64px 40px", border: "1px solid var(--gold)", textAlign: "center" }}>
                <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
                <div style={{ width: 10, height: 10, border: "1px solid var(--gold)", transform: "rotate(45deg)", margin: "0 auto 28px" }} />
                <div className="serif" style={{ fontSize: "2.8rem", color: "var(--gold)", fontWeight: 300, fontStyle: "italic", marginBottom: 20 }}>Merci</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.9 }}>
                  Your message has been received.<br />We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="name-email-row">
                  <input className="field" type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                  <input className="field" type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
                </div>
                <select className="field" name="subject" value={form.subject} onChange={handleChange} required>
                  <option value="">Select Subject</option>
                  <option value="custom">Custom Order</option>
                  <option value="sizing">Sizing Question</option>
                  <option value="general">General Inquiry</option>
                  <option value="collaboration">Collaboration</option>
                </select>
                <textarea className="field" name="message" placeholder="Your message..." value={form.message} onChange={handleChange} required style={{ height: 160, resize: "vertical" }} />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary"
                  style={{ width: "100%", padding: "16px 32px", opacity: status === "sending" ? 0.6 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}>
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
                {status === "error" && (
                  <p style={{ color: "#e88", fontSize: "0.8rem", textAlign: "center" }}>Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 72px;
          align-items: start;
        }
        .name-email-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 48px; }
          .name-email-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
