import { useState } from "react";
import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";
import type { Lang } from "@/i18n/translations";

// ── Types ──────────────────────────────────────────────────────────────────

interface OrderState {
  category: string;
  productIdx: number;
  collarIdx: number;
  sleeveIdx: number;
  fitIdx: number;
  embIdx: number;
  notes: string;
  fabricGrade: string;
  colorIdx: number;
  chest: string; waist: string; hips: string;
  height: string; inseam: string; shoulder: string;
  name: string; email: string;
}

const EMPTY: OrderState = {
  category: "", productIdx: -1,
  collarIdx: -1, sleeveIdx: -1, fitIdx: -1, embIdx: 0,
  notes: "", fabricGrade: "", colorIdx: -1,
  chest: "", waist: "", hips: "", height: "", inseam: "", shoulder: "",
  name: "", email: "",
};

// ── Catalog ────────────────────────────────────────────────────────────────

interface CatalogItem {
  name: Record<Lang, string>;
  img: string | null;
  tag: "classic" | "new";
  price: string;
}

const CAT_KEYS = ["tunique", "ensemble", "sneakers", "accessories"];
const CAT_ICONS = ["◈", "◇", "✦", "◻"];

const CATALOG: Record<string, CatalogItem[]> = {
  tunique: [
    { name: { en: "Tunique Bleu Marine",  fr: "Tunique Bleu Marine",  es: "Túnica Azul Marino"     }, img: "/img-man-navy-side.jpeg",      tag: "classic", price: "$350–$400" },
    { name: { en: "Tunique Gris Lin",     fr: "Tunique Gris Lin",     es: "Túnica Gris Lino"       }, img: "/img-man-grey-standing.jpeg",  tag: "classic", price: "$350–$400" },
    { name: { en: "Tunique Grège",        fr: "Tunique Grège",        es: "Túnica Greige"          }, img: "/img-tunique-taupe.png",       tag: "new",     price: "$350–$400" },
  ],
  ensemble: [
    { name: { en: "Classic Ensemble",     fr: "Ensemble Classique",   es: "Conjunto Clásico"       }, img: "/img-man-navy-seated.jpeg",    tag: "classic", price: "$650–$800" },
    { name: { en: "Contemporary Ensemble",fr: "Ensemble Contemporain",es: "Conjunto Contemporáneo" }, img: "/img-man-grey-outdoor.jpeg",   tag: "new",     price: "$650–$800" },
  ],
  sneakers: [
    { name: { en: "High Leather",         fr: "Cuir Haute",           es: "Cuero Alta"             }, img: null,                           tag: "classic", price: "$280–$320" },
    { name: { en: "Low-Cut Edition",      fr: "Édition Basse",        es: "Edición Baja"           }, img: null,                           tag: "new",     price: "$260–$300" },
  ],
  accessories: [
    { name: { en: "Signature Belt",       fr: "Ceinture Signature",   es: "Cinturón Signature"     }, img: null,                           tag: "classic", price: "$120–$160" },
    { name: { en: "Pocket Square Set",    fr: "Set de Pochettes",     es: "Set de Pañuelos"        }, img: null,                           tag: "new",     price: "$80–$100"  },
  ],
};

const COLOR_HEX = ["#1a2a4a", "#3a3a3a", "#f5f0e8", "#7a8f7a", "#c9a96e", "#0d0d0d"];

// ── Small UI primitives ────────────────────────────────────────────────────

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      border: `1px solid ${active ? "var(--gold)" : "var(--border)"}`,
      background: active ? "rgba(201,169,110,0.1)" : "transparent",
      color: active ? "var(--gold)" : "var(--text-muted)",
      padding: "10px 18px",
      fontSize: "0.68rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      cursor: "pointer",
      fontFamily: "inherit",
      transition: "all 0.2s",
    }}>
      {label}
    </button>
  );
}

function FieldLabel({ children, required }: { children: string; required?: boolean }) {
  return (
    <label style={{
      display: "block",
      fontSize: "0.58rem",
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color: required ? "var(--gold)" : "var(--text-muted)",
      marginBottom: 10,
    }}>
      {children}{required ? " *" : ""}
    </label>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function SurMesureFlow() {
  const { lang } = useLang();
  const a = t.atelier;

  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [order, setOrder] = useState<OrderState>(EMPTY);
  const [filter, setFilter] = useState<"all" | "classic" | "new">("all");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const set = <K extends keyof OrderState>(key: K, val: OrderState[K]) =>
    setOrder(o => ({ ...o, [key]: val }));

  const go = (next: number) => {
    setVisible(false);
    setTimeout(() => { setStep(next); setFilter("all"); setVisible(true); }, 220);
  };

  const canNext = (): boolean => {
    if (step === 0) return !!order.category;
    if (step === 1) return order.productIdx >= 0;
    if (step === 2) return order.collarIdx >= 0 && order.sleeveIdx >= 0 && order.fitIdx >= 0;
    if (step === 3) return !!order.fabricGrade && order.colorIdx >= 0;
    if (step === 4) return !!(order.chest && order.height);
    if (step === 5) return !!(order.name && order.email);
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(false);
    const catIdx = CAT_KEYS.indexOf(order.category);
    const product = order.productIdx >= 0 ? CATALOG[order.category]?.[order.productIdx] : null;
    const msg = [
      `Category: ${a.catLabels[catIdx]?.en ?? order.category}`,
      `Product: ${product?.name.en ?? ""}`,
      `Collar: ${order.collarIdx >= 0 ? a.collars[order.collarIdx].en : ""}`,
      `Sleeve: ${order.sleeveIdx >= 0 ? a.sleeves[order.sleeveIdx].en : ""}`,
      `Fit: ${order.fitIdx >= 0 ? a.fits[order.fitIdx].en : ""}`,
      `Embroidery: ${order.embIdx >= 0 ? a.embs[order.embIdx].en : ""}`,
      `Notes: ${order.notes || "None"}`,
      `Fabric: ${order.fabricGrade === "super100" ? "Super 100" : "Super 220"}`,
      `Color: ${order.colorIdx >= 0 ? a.colorNames[order.colorIdx].en : ""}`,
      `Measurements — Chest: ${order.chest}", Waist: ${order.waist}", Hips: ${order.hips}", Height: ${order.height}", Inseam: ${order.inseam}", Shoulder: ${order.shoulder}"`,
    ].join("\n");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: order.name, email: order.email, subject: "sur-mesure", message: msg }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Step renderers ─────────────────────────────────────────────────────

  const renderCategory = () => (
    <div>
      <h3 className="atl-step-title">{a.catTitle[lang]}</h3>
      <div className="atl-cat-grid">
        {CAT_KEYS.map((key, i) => (
          <button key={key}
            className="atl-cat-card"
            onClick={() => { set("category", key); set("productIdx", -1); }}
            style={{ borderColor: order.category === key ? "var(--gold)" : "var(--border)", background: order.category === key ? "rgba(201,169,110,0.07)" : "var(--bg-2)" }}>
            {order.category === key && (
              <div style={{ position: "absolute", top: 14, right: 14, width: 8, height: 8, borderRadius: "50%", background: "var(--gold)" }} />
            )}
            <div style={{ fontSize: "1.6rem", color: "var(--gold)", marginBottom: 18 }}>{CAT_ICONS[i]}</div>
            <div className="serif" style={{ fontSize: "1.2rem", fontWeight: 300, fontStyle: "italic", color: "var(--text)", marginBottom: 10 }}>
              {a.catLabels[i][lang]}
            </div>
            <p style={{ fontSize: "0.76rem", color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>
              {a.catDescs[i][lang]}
            </p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStyle = () => {
    const items = order.category ? CATALOG[order.category] ?? [] : [];
    const shown = filter === "all" ? items : items.filter(it => it.tag === filter);
    return (
      <div>
        <h3 className="atl-step-title">{a.styleTitle[lang]}</h3>
        {/* Filter bar */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {(["all", "classic", "new"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "var(--gold)" : "transparent",
              border: `1px solid ${filter === f ? "var(--gold)" : "var(--border)"}`,
              color: filter === f ? "var(--bg)" : "var(--text-muted)",
              padding: "8px 22px",
              fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase",
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
            }}>
              {f === "all" ? a.filterAll[lang] : f === "classic" ? a.filterClassic[lang] : a.filterNew[lang]}
            </button>
          ))}
        </div>
        {/* Product cards */}
        <div className="atl-style-grid">
          {shown.map((item, visIdx) => {
            const realIdx = items.indexOf(item);
            const selected = order.productIdx === realIdx;
            return (
              <button key={realIdx}
                className="atl-style-card"
                onClick={() => set("productIdx", realIdx)}
                style={{ borderColor: selected ? "var(--gold)" : "var(--border)" }}>
                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "var(--bg-3)" }}>
                  {item.img
                    ? <img src={item.img} alt={item.name[lang]} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }} className="atl-img-zoom" />
                    : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="serif" style={{ fontSize: "2rem", color: "var(--border)", fontStyle: "italic" }}>HP</span>
                      </div>
                  }
                  {selected && (
                    <div style={{ position: "absolute", inset: 0, border: "2px solid var(--gold)", pointerEvents: "none" }}>
                      <div style={{ position: "absolute", top: 10, right: 10, width: 22, height: 22, borderRadius: "50%", background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "var(--bg)", fontSize: "0.65rem", lineHeight: 1 }}>✓</span>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ padding: "14px 16px", textAlign: "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <span className="serif" style={{ fontSize: "1rem", fontWeight: 300, color: "var(--text)", lineHeight: 1.3 }}>
                      {item.name[lang]}
                    </span>
                    <span style={{ fontSize: "0.58rem", letterSpacing: "0.1em", color: "var(--gold)", flexShrink: 0, paddingTop: 3 }}>{item.tag.toUpperCase()}</span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--gold)", marginTop: 6 }}>{item.price}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDetails = () => (
    <div>
      <h3 className="atl-step-title">{a.detailsTitle[lang]}</h3>
      <div className="atl-details-grid">
        <div>
          <OptionGroup label={a.collarLabel[lang]} opts={a.collars.map(c => c[lang])} active={order.collarIdx} onSelect={i => set("collarIdx", i)} />
          <OptionGroup label={a.sleeveLabel[lang]} opts={a.sleeves.map(s => s[lang])} active={order.sleeveIdx} onSelect={i => set("sleeveIdx", i)} />
        </div>
        <div>
          <OptionGroup label={a.fitLabel[lang]} opts={a.fits.map(f => f[lang])} active={order.fitIdx} onSelect={i => set("fitIdx", i)} />
          <OptionGroup label={a.embLabel[lang]} opts={a.embs.map(e => e[lang])} active={order.embIdx} onSelect={i => set("embIdx", i)} />
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <FieldLabel>{a.notesLabel[lang]}</FieldLabel>
        <textarea className="field" placeholder={a.notesPH[lang]} value={order.notes}
          onChange={e => set("notes", e.target.value)}
          style={{ height: 100, resize: "vertical", width: "100%", boxSizing: "border-box" }} />
      </div>
    </div>
  );

  const renderFabric = () => (
    <div>
      <h3 className="atl-step-title">{a.fabricTitle[lang]}</h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: 40 }}>{a.fabricSub[lang]}</p>
      <div className="atl-fabric-grid" style={{ marginBottom: 48 }}>
        {[
          { key: "super100", badge: a.fabric100Badge[lang], label: a.fabric100Label[lang], desc: a.fabric100Desc[lang] },
          { key: "super220", badge: a.fabric220Badge[lang], label: a.fabric220Label[lang], desc: a.fabric220Desc[lang] },
        ].map(g => (
          <button key={g.key}
            className="atl-fabric-card"
            onClick={() => set("fabricGrade", g.key)}
            style={{ borderColor: order.fabricGrade === g.key ? "var(--gold)" : "var(--border)", background: order.fabricGrade === g.key ? "rgba(201,169,110,0.07)" : "var(--bg-2)" }}>
            {order.fabricGrade === g.key && (
              <div style={{ position: "absolute", top: 14, right: 14, width: 8, height: 8, borderRadius: "50%", background: "var(--gold)" }} />
            )}
            <div style={{ fontSize: "0.52rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>{g.badge}</div>
            <div className="serif" style={{ fontSize: "1.5rem", fontWeight: 300, fontStyle: "italic", color: "var(--text)", marginBottom: 14 }}>{g.label}</div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.8, margin: 0 }}>{g.desc}</p>
          </button>
        ))}
      </div>
      <div>
        <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>{a.colorLabel[lang]}</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {a.colorNames.map((cn, i) => {
            const name = cn[lang];
            const hex = COLOR_HEX[i];
            const sel = order.colorIdx === i;
            return (
              <button key={i} onClick={() => set("colorIdx", i)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: hex,
                  border: `2px solid ${sel ? "var(--gold)" : "var(--border)"}`,
                  boxShadow: sel ? "0 0 0 2px var(--bg), 0 0 0 4px var(--gold)" : "none",
                  outline: hex === "#f5f0e8" ? "1px solid #3a3a3a" : "none",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                }} />
                <span style={{ fontSize: "0.54rem", letterSpacing: "0.12em", textTransform: "uppercase", color: sel ? "var(--gold)" : "var(--text-muted)" }}>{name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderMeasurements = () => {
    const fields: [keyof OrderState, string, boolean][] = [
      ["chest",    a.fieldChest[lang],    true],
      ["waist",    a.fieldWaist[lang],    false],
      ["hips",     a.fieldHips[lang],     false],
      ["height",   a.fieldHeight[lang],   true],
      ["inseam",   a.fieldInseam[lang],   false],
      ["shoulder", a.fieldShoulder[lang], false],
    ];
    return (
      <div>
        <h3 className="atl-step-title">{a.measTitle[lang]}</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: 8 }}>{a.measSub[lang]}</p>
        <a href="#measurements" style={{ display: "inline-block", fontSize: "0.62rem", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 40 }}>
          ↗ {a.aiLink[lang]}
        </a>
        <div className="atl-meas-grid">
          {fields.map(([key, label, req]) => (
            <div key={key}>
              <FieldLabel required={req}>{label}</FieldLabel>
              <input className="field" type="number" min="0" step="0.5"
                placeholder="0"
                value={order[key] as string}
                onChange={e => set(key, e.target.value)}
                style={{ width: "100%", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderReview = () => {
    if (submitted) return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <div style={{ width: 12, height: 12, border: "1px solid var(--gold)", transform: "rotate(45deg)", margin: "0 auto 32px" }} />
        <div className="serif" style={{ fontSize: "2.8rem", color: "var(--gold)", fontWeight: 300, fontStyle: "italic", marginBottom: 20 }}>
          {a.successTitle[lang]}
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.9, maxWidth: 440, margin: "0 auto" }}>
          {a.successMsg[lang]}
        </p>
      </div>
    );

    const catIdx = CAT_KEYS.indexOf(order.category);
    const product = order.productIdx >= 0 ? CATALOG[order.category]?.[order.productIdx] : null;
    const rows: [string, string][] = [
      [a.stepLabels[0][lang], catIdx >= 0 ? a.catLabels[catIdx][lang] : ""],
      [a.stepLabels[1][lang], product?.name[lang] ?? ""],
      [a.collarLabel[lang], [
        order.collarIdx >= 0 ? a.collars[order.collarIdx][lang] : "",
        order.sleeveIdx >= 0 ? a.sleeves[order.sleeveIdx][lang] : "",
        order.fitIdx >= 0 ? a.fits[order.fitIdx][lang] : "",
      ].filter(Boolean).join(" · ")],
      [a.embLabel[lang], order.embIdx >= 0 ? a.embs[order.embIdx][lang] : ""],
      [a.stepLabels[3][lang], [
        order.fabricGrade === "super100" ? a.fabric100Label[lang] : order.fabricGrade === "super220" ? a.fabric220Label[lang] : "",
        order.colorIdx >= 0 ? a.colorNames[order.colorIdx][lang] : "",
      ].filter(Boolean).join(", ")],
      [a.stepLabels[4][lang], [
        order.chest && `${a.fieldChest[lang]}: ${order.chest}"`,
        order.height && `${a.fieldHeight[lang]}: ${order.height}"`,
      ].filter(Boolean).join("  ")],
    ].filter((r): r is [string, string] => !!r[1]);

    return (
      <div>
        <h3 className="atl-step-title">{a.reviewTitle[lang]}</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: 40 }}>{a.reviewSub[lang]}</p>
        <div style={{ border: "1px solid var(--border)", marginBottom: 40 }}>
          {rows.map(([label, value], i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 22px", gap: 16,
              borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <span style={{ fontSize: "0.56rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold)", flexShrink: 0 }}>{label}</span>
              <span style={{ color: "var(--text)", fontSize: "0.85rem", textAlign: "right" }}>{value}</span>
            </div>
          ))}
        </div>
        <div className="atl-review-inputs">
          <input className="field" type="text" placeholder={a.namePH[lang]} value={order.name} onChange={e => set("name", e.target.value)} />
          <input className="field" type="email" placeholder={a.emailPH[lang]} value={order.email} onChange={e => set("email", e.target.value)} />
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting || !order.name || !order.email}
          className="btn-primary"
          style={{
            width: "100%", padding: "17px 32px", marginTop: 16,
            opacity: (submitting || !order.name || !order.email) ? 0.5 : 1,
            cursor: (submitting || !order.name || !order.email) ? "not-allowed" : "pointer",
          }}>
          {submitting ? a.submittingBtn[lang] : a.submitBtn[lang]}
        </button>
        {submitError && (
          <p style={{ color: "#e88", fontSize: "0.8rem", textAlign: "center", marginTop: 14 }}>
            {t.contact.errorMsg[lang]}
          </p>
        )}
      </div>
    );
  };

  const TOTAL = a.stepLabels.length;
  const stepContent = [renderCategory, renderStyle, renderDetails, renderFabric, renderMeasurements, renderReview];

  return (
    <section id="atelier" style={{ background: "var(--bg)", padding: "100px 40px", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "repeating-linear-gradient(90deg,var(--gold) 0,var(--gold) 8px,transparent 8px,transparent 16px,#7a5c30 16px,#7a5c30 22px,transparent 22px,transparent 30px)",
        opacity: 0.35,
      }} />

      <div className="section-inner">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className="section-label">{a.badge[lang]}</p>
          <h2 className="section-title" style={{ fontStyle: "italic" }}>{a.title[lang]}</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "24px auto 16px" }}>
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
            <div style={{ width: 6, height: 6, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.84rem" }}>{a.sub[lang]}</p>
        </div>

        {/* ── Step Indicator ── */}
        <div style={{ marginBottom: 64 }}>
          {/* Desktop stepper */}
          <div className="atl-stepper-desk">
            {a.stepLabels.map((lbl, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, position: "relative" }}>
                {i > 0 && (
                  <div style={{
                    position: "absolute", top: 13, right: "50%", left: "-50%",
                    height: 1,
                    background: i <= step ? "var(--gold)" : "var(--border)",
                    transition: "background 0.4s",
                  }} />
                )}
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", zIndex: 1,
                  border: `1px solid ${i <= step ? "var(--gold)" : "var(--border)"}`,
                  background: i < step ? "var(--gold)" : i === step ? "rgba(201,169,110,0.14)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s",
                }}>
                  {i < step
                    ? <span style={{ color: "var(--bg)", fontSize: "0.6rem" }}>✓</span>
                    : <span style={{ fontSize: "0.54rem", color: i === step ? "var(--gold)" : "var(--text-dim)" }}>{i + 1}</span>
                  }
                </div>
                <div style={{
                  marginTop: 10, fontSize: "0.5rem", letterSpacing: "0.2em",
                  textTransform: "uppercase", textAlign: "center", whiteSpace: "nowrap",
                  color: i === step ? "var(--gold)" : i < step ? "var(--text-muted)" : "var(--text-dim)",
                  transition: "color 0.3s",
                }}>
                  {lbl[lang]}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile stepper */}
          <div className="atl-stepper-mob">
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>
              {a.stepOf[lang]} {step + 1} {a.of[lang]} {TOTAL}
            </div>
            <div style={{ fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
              {a.stepLabels[step][lang]}
            </div>
            <div style={{ height: 2, background: "var(--border)", borderRadius: 1 }}>
              <div style={{
                height: "100%", borderRadius: 1, background: "var(--gold)",
                width: `${((step + 1) / TOTAL) * 100}%`,
                transition: "width 0.4s ease",
              }} />
            </div>
          </div>
        </div>

        {/* ── Step Content ── */}
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
          }}>
            {stepContent[step]()}
          </div>

          {/* ── Navigation ── */}
          {!submitted && (
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginTop: 56, paddingTop: 28, borderTop: "1px solid var(--border)",
            }}>
              <button
                onClick={() => step > 0 && go(step - 1)}
                style={{
                  background: "none", border: "1px solid var(--border)",
                  color: step === 0 ? "var(--text-dim)" : "var(--text-muted)",
                  padding: "12px 28px", fontSize: "0.62rem", letterSpacing: "0.25em",
                  textTransform: "uppercase", cursor: step === 0 ? "default" : "pointer",
                  fontFamily: "inherit", transition: "all 0.2s", opacity: step === 0 ? 0.35 : 1,
                }}>
                {a.back[lang]}
              </button>

              <div style={{ fontSize: "0.54rem", letterSpacing: "0.2em", color: "var(--text-dim)" }}>
                {step + 1} / {TOTAL}
              </div>

              {step < TOTAL - 1 && (
                <button
                  onClick={() => canNext() && go(step + 1)}
                  style={{
                    background: canNext() ? "var(--gold)" : "transparent",
                    border: "1px solid var(--gold)",
                    color: canNext() ? "var(--bg)" : "var(--text-dim)",
                    padding: "12px 36px", fontSize: "0.62rem", letterSpacing: "0.25em",
                    textTransform: "uppercase", cursor: canNext() ? "pointer" : "default",
                    fontFamily: "inherit", transition: "all 0.2s", opacity: canNext() ? 1 : 0.45,
                  }}>
                  {a.next[lang]}
                </button>
              )}
              {step === TOTAL - 1 && <div style={{ width: 80 }} />}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .atl-step-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 300;
          font-style: italic;
          color: var(--text);
          margin-bottom: 36px;
        }
        /* Category grid */
        .atl-cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .atl-cat-card {
          position: relative; padding: 32px 22px; text-align: center;
          cursor: pointer; border: 1px solid var(--border); font-family: inherit;
          transition: border-color 0.25s, background 0.25s;
        }
        .atl-cat-card:hover { border-color: var(--gold) !important; }
        /* Style grid */
        .atl-style-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .atl-style-card {
          background: transparent; border: 1px solid var(--border); cursor: pointer;
          font-family: inherit; padding: 0; text-align: left; transition: border-color 0.25s;
          overflow: hidden;
        }
        .atl-style-card:hover { border-color: var(--gold) !important; }
        .atl-style-card:hover .atl-img-zoom { transform: scale(1.04); }
        /* Details grid */
        .atl-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 48px; }
        /* Fabric grid */
        .atl-fabric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .atl-fabric-card {
          position: relative; padding: 32px 28px; text-align: left; cursor: pointer;
          border: 1px solid var(--border); font-family: inherit; transition: all 0.25s;
        }
        .atl-fabric-card:hover { border-color: var(--gold) !important; }
        /* Measurements grid */
        .atl-meas-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        /* Review inputs */
        .atl-review-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        /* Steppers */
        .atl-stepper-desk { display: flex; align-items: flex-start; justify-content: center; }
        .atl-stepper-mob  { display: none; text-align: center; }

        @media (max-width: 900px) {
          .atl-cat-grid   { grid-template-columns: 1fr 1fr !important; }
          .atl-style-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          #atelier { padding: 80px 20px !important; }
          .atl-stepper-desk { display: none !important; }
          .atl-stepper-mob  { display: block !important; }
          .atl-details-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .atl-fabric-grid  { grid-template-columns: 1fr !important; }
          .atl-review-inputs{ grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .atl-cat-grid   { grid-template-columns: 1fr !important; }
          .atl-style-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .atl-meas-grid  { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ── Option group helper (defined outside to avoid recreation) ──────────────

function OptionGroup({
  label, opts, active, onSelect,
}: { label: string; opts: string[]; active: number; onSelect: (i: number) => void }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14 }}>
        {label}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {opts.map((opt, i) => (
          <Pill key={i} label={opt} active={active === i} onClick={() => onSelect(i)} />
        ))}
      </div>
    </div>
  );
}
