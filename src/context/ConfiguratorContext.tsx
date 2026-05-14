import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { ConfigurableProduct } from "@/data/productCatalog";

interface ConfiguratorCtx {
  open: (product: ConfigurableProduct) => void;
}

const Ctx = createContext<ConfiguratorCtx>({ open: () => {} });

export function useConfigurator() {
  return useContext(Ctx);
}

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<ConfigurableProduct | null>(null);

  const open = useCallback((p: ConfigurableProduct) => setProduct(p), []);
  const close = useCallback(() => setProduct(null), []);

  // Lazy-load the heavy configurator modal only when needed
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {product && <ConfiguratorModal product={product} onClose={close} />}
    </Ctx.Provider>
  );
}

// ── Inline modal (no separate file needed) ──────────────────────────────────
import { useRef, useEffect } from "react";
import { DESIGN_OPTIONS, FIT_OPTIONS } from "@/data/productCatalog";
import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";

interface Selection {
  colorIdx: number;
  fabricId: string;
  designId: string;
  fitId: string;
  notes: string;
  // Measurements (chest + height required; waist, hips, shoulder, inseam optional)
  chest: string;
  waist: string;
  hips: string;
  height: string;
  shoulder: string;
  inseam: string;
  name: string;
  email: string;
  appointment: string;
}

const EMPTY_SEL: Selection = {
  colorIdx: -1, fabricId: "", designId: "", fitId: "",
  notes: "",
  chest: "", waist: "", hips: "", height: "", shoulder: "", inseam: "",
  name: "", email: "", appointment: "",
};

function ConfiguratorModal({ product, onClose }: { product: ConfigurableProduct; onClose: () => void }) {
  const { lang } = useLang();
  const cfg = t.configurator;
  const [sel, setSel] = useState(EMPTY_SEL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Selection>(k: K, v: Selection[K]) =>
    setSel(s => ({ ...s, [k]: v }));

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  const selectedColor  = sel.colorIdx >= 0 ? product.colors[sel.colorIdx] : null;
  const selectedFabric = product.fabrics.find(f => f.id === sel.fabricId) ?? null;
  const selectedDesign = DESIGN_OPTIONS.find(d => d.id === sel.designId) ?? null;
  const selectedFit    = FIT_OPTIONS.find(f => f.id === sel.fitId) ?? null;

  const hasMeasurements = !!(sel.chest.trim() && sel.waist.trim() && sel.hips.trim() && sel.height.trim() && sel.shoulder.trim() && sel.inseam.trim());
  const hasAppointment  = sel.appointment.trim().length > 2;
  const hasContact      = !!(sel.name.trim() && sel.email.trim());

  const [triedSubmit, setTriedSubmit] = useState(false);

  const handleSubmit = async () => {
    setTriedSubmit(true);
    if (!hasContact || !hasMeasurements || !hasAppointment) return;
    setSubmitting(true);
    setSubmitError(false);
    const measurementSummary = [
      `Chest/Bust: ${sel.chest}"`,
      sel.waist    ? `Waist: ${sel.waist}"`       : "",
      sel.hips     ? `Hips: ${sel.hips}"`         : "",
      `Height: ${sel.height}"`,
      sel.shoulder ? `Shoulder: ${sel.shoulder}"` : "",
      sel.inseam   ? `Inseam: ${sel.inseam}"`     : "",
    ].filter(Boolean).join(", ");
    const msg = [
      `Product: ${product.name}`,
      `Price Range: ${product.price}`,
      selectedColor  ? `Color: ${selectedColor.name}`                          : "Color: Not selected",
      selectedFabric ? `Fabric: ${selectedFabric.grade} — ${selectedFabric.desc}` : "Fabric: Not selected",
      selectedDesign ? `Design Style: ${selectedDesign.name}`                  : "Design Style: Not selected",
      selectedFit    ? `Fit: ${selectedFit.name}`                              : "Fit: Not selected",
      `Measurements: ${measurementSummary}`,
      sel.notes       ? `Custom Notes: ${sel.notes}`                           : "",
      `Appointment Preference: ${sel.appointment}`,
    ].filter(Boolean).join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sel.name,
          email: sel.email,
          subject: "commission-request",
          message: msg,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Overlay onClose={onClose} onKeyDown={handleKey}>
        <div style={{ maxWidth: 480, margin: "auto", textAlign: "center", padding: "60px 40px" }}>
          <div style={{ width: 48, height: 48, border: "1px solid var(--gold)", transform: "rotate(45deg)", margin: "0 auto 32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ transform: "rotate(-45deg)", color: "var(--gold)", fontSize: "1.4rem" }}>✓</div>
          </div>
          <p className="serif" style={{ fontSize: "1.8rem", fontWeight: 300, fontStyle: "italic", color: "var(--gold)", marginBottom: 16 }}>
            {cfg.successTitle[lang]}
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: 32 }}>
            {cfg.successMsg[lang]}
          </p>
          <button onClick={onClose} className="btn-primary">{cfg.closeBtn[lang]}</button>
        </div>
      </Overlay>
    );
  }

  return (
    <Overlay onClose={onClose} onKeyDown={handleKey}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 32px", borderBottom: "1px solid var(--border)",
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontSize: "0.55rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>
            {cfg.headerLabel[lang]}
          </div>
          <div className="serif" style={{ fontSize: "1.4rem", fontWeight: 300, fontStyle: "italic", color: "var(--text)" }}>
            {product.name}
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)",
            width: 40, height: 40, cursor: "pointer", fontSize: "1.2rem", fontFamily: "inherit",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>

        {/* Left: sticky image + summary */}
        <div className="cfg-left">
          <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", border: "1px solid var(--border)", marginBottom: 24 }}>
            <img
              src={product.image}
              alt={product.name}
              draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
            />
            {selectedColor && (
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "12px 16px",
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: selectedColor.hex, border: "1px solid rgba(255,255,255,0.3)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>
                    {selectedColor.name}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Live summary */}
          <div style={{ border: "1px solid var(--border)", padding: "20px 20px" }}>
            <div style={{ fontSize: "0.55rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
              {cfg.summaryTitle[lang]}
            </div>
            {([
              [cfg.summaryColor[lang],        selectedColor?.name  ?? ""],
              [cfg.summaryFabric[lang],        selectedFabric?.grade ?? ""],
              [cfg.summaryDesign[lang],        selectedDesign?.name  ?? ""],
              [cfg.summaryFit[lang],           selectedFit?.name     ?? ""],
              [cfg.summaryMeasurements[lang],  hasMeasurements ? cfg.summaryMeasurementsOk[lang] : ""],
              [cfg.summaryAppointment[lang],   hasAppointment  ? cfg.summaryAppointmentOk[lang]  : ""],
            ] as [string, string][]).map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>{label}</span>
                <span style={{ fontSize: "0.75rem", color: value ? "var(--gold)" : "var(--text-dim)", fontStyle: value ? "normal" : "italic" }}>
                  {value || cfg.summaryNone[lang]}
                </span>
              </div>
            ))}
            <div style={{ marginTop: 8, textAlign: "right" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--gold)" }}>{product.price}</span>
            </div>
          </div>
        </div>

        {/* Right: scrollable configurator */}
        <div ref={scrollRef} className="cfg-right" style={{ flex: 1, overflowY: "auto", padding: "32px 40px 120px" }}>

          {/* Section: Color */}
          <Section label={cfg.colorTitle[lang]} required>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => set("colorIdx", i)}
                  title={c.name}
                  aria-label={c.name}
                  style={{
                    width: 44, height: 44,
                    borderRadius: "50%",
                    background: c.hex,
                    border: sel.colorIdx === i ? "3px solid var(--gold)" : "2px solid rgba(255,255,255,0.15)",
                    cursor: "pointer",
                    boxShadow: sel.colorIdx === i ? "0 0 0 2px var(--bg), 0 0 0 4px var(--gold)" : "none",
                    transition: "box-shadow 0.2s, border 0.2s",
                    flexShrink: 0,
                    position: "relative",
                  }}
                />
              ))}
            </div>
            {selectedColor && (
              <div style={{ marginTop: 10, fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.15em" }}>
                {selectedColor.name}
              </div>
            )}
          </Section>

          {/* Section: Fabric */}
          <Section label={cfg.fabricTitle[lang]}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {product.fabrics.map(f => (
                <button
                  key={f.id}
                  onClick={() => set("fabricId", f.id)}
                  style={{
                    background: sel.fabricId === f.id ? "rgba(201,169,110,0.08)" : "var(--bg-2)",
                    border: `1px solid ${sel.fabricId === f.id ? "var(--gold)" : "var(--border)"}`,
                    padding: "14px 18px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: sel.fabricId === f.id ? "var(--gold)" : "var(--text)", marginBottom: 4 }}>
                      {f.grade}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{f.desc}</div>
                  </div>
                  {sel.fabricId === f.id && (
                    <div style={{ width: 8, height: 8, background: "var(--gold)", transform: "rotate(45deg)", flexShrink: 0, marginLeft: 16 }} />
                  )}
                </button>
              ))}
            </div>
          </Section>

          {/* Section: Design Option */}
          <Section label={cfg.designTitle[lang]} required>
            <div className="design-grid">
              {DESIGN_OPTIONS.map(d => (
                <button
                  key={d.id}
                  onClick={() => set("designId", d.id)}
                  className={`design-card${sel.designId === d.id ? " design-card--active" : ""}`}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: 10, color: sel.designId === d.id ? "var(--gold)" : "var(--text-muted)" }}>
                    {d.icon}
                  </div>
                  <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: sel.designId === d.id ? "var(--gold)" : "var(--text)", marginBottom: 6, fontWeight: 500 }}>
                    {d.name}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                    {d.desc}
                  </div>
                </button>
              ))}
            </div>
          </Section>

          {/* Section: Fit Preference */}
          <Section label={cfg.fitTitle[lang]} required>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {FIT_OPTIONS.map(f => (
                <button
                  key={f.id}
                  onClick={() => set("fitId", f.id)}
                  style={{
                    background: sel.fitId === f.id ? "rgba(201,169,110,0.08)" : "var(--bg-2)",
                    border: `1px solid ${sel.fitId === f.id ? "var(--gold)" : "var(--border)"}`,
                    padding: "16px 14px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                >
                  <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: sel.fitId === f.id ? "var(--gold)" : "var(--text)", marginBottom: 5 }}>
                    {f.name}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1.55 }}>{f.desc}</div>
                </button>
              ))}
            </div>
          </Section>

          {/* Section: Measurements — required */}
          <Section label={cfg.measurementsTitle[lang]} required>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {([
                ["chest",    cfg.mChest[lang]],
                ["waist",    cfg.mWaist[lang]],
                ["hips",     cfg.mHips[lang]],
                ["height",   cfg.mHeight[lang]],
                ["shoulder", cfg.mShoulder[lang]],
                ["inseam",   cfg.mInseam[lang]],
              ] as [keyof Selection, string][]).map(([key, ph]) => (
                <input
                  key={key}
                  className={`field${triedSubmit && !sel[key] ? " field--error" : ""}`}
                  type="number"
                  step="0.5"
                  min="0"
                  inputMode="decimal"
                  placeholder={ph}
                  value={sel[key] as string}
                  onChange={e => set(key, e.target.value)}
                />
              ))}
            </div>
            <p style={{ marginTop: 12, fontSize: "0.68rem", color: "var(--text-dim)", lineHeight: 1.7 }}>
              {cfg.measurementsHint[lang]}
            </p>
            {triedSubmit && !hasMeasurements && (
              <ValidationError>{cfg.errorMeasurements[lang]}</ValidationError>
            )}
          </Section>

          {/* Section: Custom Notes */}
          <Section label={cfg.notesTitle[lang]}>
            <textarea
              className="field"
              placeholder={cfg.notesPH[lang]}
              value={sel.notes}
              onChange={e => set("notes", e.target.value)}
              style={{ width: "100%", height: 100, resize: "vertical" }}
            />
          </Section>

          {/* Section: Contact + Appointment */}
          <Section label={cfg.contactTitle[lang]} required>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input className="field" type="text" placeholder={cfg.namePH[lang]} value={sel.name} onChange={e => set("name", e.target.value)} />
              <input className="field" type="email" placeholder={cfg.emailPH[lang]} value={sel.email} onChange={e => set("email", e.target.value)} />
              {triedSubmit && !hasContact && (
                <ValidationError>{cfg.errorContact[lang]}</ValidationError>
              )}
              <textarea
                className={`field${triedSubmit && !hasAppointment ? " field--error" : ""}`}
                placeholder={cfg.appointmentPH[lang]}
                value={sel.appointment}
                onChange={e => set("appointment", e.target.value)}
                style={{ height: 80, resize: "vertical" }}
              />
              {triedSubmit && !hasAppointment && (
                <ValidationError>{cfg.errorAppointment[lang]}</ValidationError>
              )}
            </div>
            <p style={{ marginTop: 12, fontSize: "0.68rem", color: "var(--text-dim)", lineHeight: 1.7 }}>
              {cfg.requirementNote[lang]}
            </p>
          </Section>

          {submitError && (
            <div style={{ padding: "14px 18px", border: "1px solid #5a2020", background: "#1a0808", color: "#e88", fontSize: "0.82rem", marginBottom: 24 }}>
              {t.contact.errorMsg[lang]}
            </div>
          )}
        </div>
      </div>

      {/* Sticky footer CTA */}
      <div style={{
        padding: "18px 32px",
        borderTop: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 24, flexShrink: 0,
        background: "var(--bg)",
      }}>
        <div style={{ fontSize: "0.65rem", lineHeight: 1.6, flex: 1 }}>
          {hasContact && hasMeasurements && hasAppointment
            ? <span style={{ color: "var(--gold)" }}>✓ {sel.name} · {product.name}</span>
            : <span style={{ color: "var(--text-dim)", fontStyle: "italic" }}>{cfg.ctaHint[lang]}</span>
          }
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn-primary"
          style={{ flexShrink: 0, opacity: submitting ? 0.5 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
        >
          {submitting ? cfg.submittingBtn[lang] : cfg.submitBtn[lang]}
        </button>
      </div>

      <style>{`
        .cfg-left {
          width: 300px;
          min-width: 280px;
          padding: 32px 28px;
          border-right: 1px solid var(--border);
          overflow-y: auto;
          flex-shrink: 0;
        }
        .design-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .design-card {
          background: var(--bg-2);
          border: 1px solid var(--border);
          padding: 18px 14px;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
          transition: border-color 0.2s, background 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .design-card:hover { border-color: rgba(201,169,110,0.4); }
        .design-card--active {
          border-color: var(--gold) !important;
          background: rgba(201,169,110,0.07) !important;
        }
        .field--error { border-color: #8a3030 !important; }
        @media (max-width: 768px) {
          .cfg-left { display: none; }
          .design-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .design-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Overlay>
  );
}

function ValidationError({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      padding: "12px 16px", marginTop: 10,
      border: "1px solid #8a3030", background: "rgba(90,20,20,0.18)",
    }}>
      <div style={{ width: 5, height: 5, background: "#e88", transform: "rotate(45deg)", flexShrink: 0, marginTop: 4 }} />
      <span style={{ fontSize: "0.78rem", color: "#e88", lineHeight: 1.6 }}>{children}</span>
    </div>
  );
}

function Overlay({ children, onClose, onKeyDown }: { children: ReactNode; onClose: () => void; onKeyDown: (e: React.KeyboardEvent) => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      autoFocus
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        background: "rgba(4,4,4,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          width: "100%",
          maxWidth: 1100,
          maxHeight: "96vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Section({ label, children, required }: { label: string; children: ReactNode; required?: boolean }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: required ? "var(--gold)" : "var(--text-muted)" }}>
          {label}
        </span>
        {required && <div style={{ width: 4, height: 4, background: "var(--gold)", transform: "rotate(45deg)" }} />}
      </div>
      {children}
    </div>
  );
}

