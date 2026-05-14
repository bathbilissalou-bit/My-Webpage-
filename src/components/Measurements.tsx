import { useState, useRef } from "react";
import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";
import { processImageForUpload } from "@/lib/imageUtils";
import { HelpIcon } from "@/components/MeasurementGuide";

interface MeasurementResult {
  chest?: string; waist?: string; hips?: string; inseam?: string;
  shoulder?: string; height?: string;
  recommendedSize: string; notes: string; confidence: string;
  comingSoon?: boolean;
}

const FIELD_GROUPS = [
  ["chestPH",        "chest",        "Chest / Bust",   "chest"],
  ["waistPH",        "waist",        "Waist",          "waist"],
  ["hipsPH",         "hips",         "Hips",           "hips"],
  ["shoulderWidthPH","shoulderWidth","Shoulder Width",  "shoulder"],
  ["neckPH",         "neck",         "Neck",            "neck"],
  ["sleeveLengthPH", "sleeveLength", "Sleeve Length",  "sleeveLength"],
  ["bicepPH",        "bicep",        "Bicep",           "bicep"],
  ["wristPH",        "wrist",        "Wrist",           "wrist"],
  ["backLengthPH",   "backLength",   "Back Length",    "backLength"],
  ["inseamCalcPH",   "inseamCalc",   "Inseam",         "inseam"],
  ["heightPH",       "calcHeight",   "Height",         "calcHeight"],
] as const;

type FieldKey = typeof FIELD_GROUPS[number][1];

export function Measurements() {
  const { lang } = useLang();

  // AI photo form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MeasurementResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Calculator fields
  const [fields, setFields] = useState<Record<FieldKey, string>>({
    chest: "", waist: "", hips: "", shoulderWidth: "", neck: "",
    sleeveLength: "", bicep: "", wrist: "", backLength: "", inseamCalc: "", calcHeight: "",
  });
  const [fit, setFit] = useState("");
  const [calcName, setCalcName] = useState("");
  const [calcEmail, setCalcEmail] = useState("");
  const [calcResult, setCalcResult] = useState<{ size: string; fitLabel: string } | null>(null);
  const [calcError, setCalcError] = useState("");
  const [calcSuccess, setCalcSuccess] = useState("");
  const [calcLoading, setCalcLoading] = useState(false);

  const setField = (key: FieldKey, val: string) =>
    setFields(prev => ({ ...prev, [key]: val }));

  const handleFileSelect = (selected: File | null) => {
    if (!selected) return;
    setFile(selected);
    setError(null);
    setResult(null);
    setUploadStatus("");

    // Show immediate preview using object URL
    const url = URL.createObjectURL(selected);
    setPreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { setError(t.measurements.uploadError[lang]); return; }

    setLoading(true);
    setError(null);
    setResult(null);
    setUploadStatus("");

    try {
      const processed = await processImageForUpload(file, setUploadStatus);

      setUploadStatus(`Sending (${processed.compressedKB} KB)…`);

      const response = await fetch("/api/measurements/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: processed.base64,
          mimeType: processed.mimeType,
          name,
          email,
          notes,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || t.measurements.genericError[lang]);
      }

      setUploadStatus("");
      setResult(await response.json());
    } catch (err: unknown) {
      setUploadStatus("");
      setError(err instanceof Error ? err.message : t.measurements.genericError[lang]);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async () => {
    if (!fields.chest || !fields.waist || !fields.calcHeight) {
      setCalcError(t.measurements.calcError[lang]);
      setCalcResult(null);
      return;
    }
    setCalcError("");
    setCalcSuccess("");

    const c = parseFloat(fields.chest);
    const size = c <= 36 ? "Small" : c <= 40 ? "Medium" : c <= 44 ? "Large" : "X-Large";
    const fitLabel = fit === "slim"
      ? t.measurements.fitSlim[lang]
      : fit === "loose"
        ? t.measurements.fitLoose[lang]
        : t.measurements.fitRegular[lang];
    setCalcResult({ size, fitLabel });

    const measureLines = [
      `Chest / Bust: ${fields.chest}"`,
      `Waist: ${fields.waist}"`,
      fields.hips         ? `Hips: ${fields.hips}"`               : "",
      fields.shoulderWidth ? `Shoulder Width: ${fields.shoulderWidth}"` : "",
      fields.neck         ? `Neck: ${fields.neck}"`               : "",
      fields.sleeveLength ? `Sleeve Length: ${fields.sleeveLength}"` : "",
      fields.bicep        ? `Bicep: ${fields.bicep}"`             : "",
      fields.wrist        ? `Wrist: ${fields.wrist}"`             : "",
      fields.backLength   ? `Back Length: ${fields.backLength}"`  : "",
      fields.inseamCalc   ? `Inseam: ${fields.inseamCalc}"`      : "",
      `Height: ${fields.calcHeight}"`,
      fit ? `Fit Style: ${fitLabel}` : "",
      `Recommended Size: ${size}`,
    ].filter(Boolean).join("\n");

    setCalcLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: calcName || "Anonymous",
          email: calcEmail || "noreply@havreplacide.com",
          subject: "measurements",
          message: measureLines,
        }),
      });
      setCalcSuccess(t.measurements.calcSuccess[lang]);
    } catch {
      // size result still shown even if submission fails silently
    } finally {
      setCalcLoading(false);
    }
  };

  const measureFields = [
    [t.measurements.chest[lang],   result?.chest],
    [t.measurements.waist[lang],   result?.waist],
    [t.measurements.hips[lang],    result?.hips],
    [t.measurements.inseam[lang],  result?.inseam],
    [t.measurements.shoulder[lang],result?.shoulder],
    [t.measurements.height[lang],  result?.height],
  ] as [string, string | undefined][];

  return (
    <section id="measurements" style={{ background: "var(--bg)", padding: "100px 40px" }}>
      <div className="section-inner">
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p className="section-label">{t.measurements.label[lang]}</p>
          <h2 className="section-title">{t.measurements.title[lang]}</h2>
          <div className="divider" style={{ margin: "24px auto" }} />
          <p style={{ color: "var(--text-muted)", maxWidth: 500, margin: "0 auto", fontSize: "0.85rem" }}>
            {t.measurements.sub[lang]}
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, marginBottom: 80, background: "var(--border)" }}>
          {t.measurements.steps.map(s => (
            <div key={s.num} style={{ background: "var(--bg)", padding: "40px 32px", textAlign: "center" }}>
              <div className="serif" style={{ fontSize: "2.5rem", color: "var(--gold)", fontWeight: 300, marginBottom: 16 }}>{s.num}</div>
              <h3 style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text)", marginBottom: 12 }}>{s.title[lang]}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.7 }}>{s.desc[lang]}</p>
            </div>
          ))}
        </div>

        <div className="measurements-grid">
          {/* ── AI Photo Form ── */}
          <div>
            <h3 style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 32 }}>
              {t.measurements.aiTitle[lang]}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input className="field" type="text" placeholder={t.measurements.namePH[lang]} value={name} onChange={e => setName(e.target.value)} />
              <input className="field" type="email" placeholder={t.measurements.emailPH[lang]} value={email} onChange={e => setEmail(e.target.value)} />

              {/* ── Upload area ── */}
              <div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>
                  {t.measurements.uploadLabel[lang]}
                </div>

                {/* Hidden inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.heic,.heif"
                  style={{ display: "none" }}
                  onChange={e => handleFileSelect(e.target.files?.[0] ?? null)}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  style={{ display: "none" }}
                  onChange={e => handleFileSelect(e.target.files?.[0] ?? null)}
                />

                {/* Tap targets */}
                {!file ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="upload-btn"
                    >
                      <span style={{ fontSize: "1.4rem", display: "block", marginBottom: 8 }}>🖼</span>
                      <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                        {t.measurements.uploadGallery[lang]}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="upload-btn"
                    >
                      <span style={{ fontSize: "1.4rem", display: "block", marginBottom: 8 }}>📷</span>
                      <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                        {t.measurements.uploadCamera[lang]}
                      </span>
                    </button>
                  </div>
                ) : (
                  /* Preview + change button */
                  <div style={{ position: "relative", border: "1px solid var(--gold)", padding: 12, display: "flex", gap: 14, alignItems: "center", background: "var(--bg-2)" }}>
                    {preview && (
                      <img
                        src={preview}
                        alt="Selected"
                        draggable={false}
                        style={{ width: 64, height: 80, objectFit: "cover", flexShrink: 0, border: "1px solid var(--border)" }}
                      />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.7rem", color: "var(--gold)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {file.name}
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setFile(null); setPreview(null); setError(null); setResult(null); setUploadStatus(""); }}
                      style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text-muted)", padding: "6px 12px", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", flexShrink: 0 }}
                    >
                      Change
                    </button>
                  </div>
                )}

                <p style={{ fontSize: "0.65rem", color: "var(--text-dim)", marginTop: 8, lineHeight: 1.6 }}>
                  {t.measurements.uploadHint[lang]}
                </p>
              </div>

              <textarea className="field" placeholder={t.measurements.notesPH[lang]}
                value={notes} onChange={e => setNotes(e.target.value)}
                style={{ height: 90, resize: "vertical" }} />

              <button
                type="submit"
                disabled={loading || !file}
                className="btn-primary"
                style={{ opacity: (loading || !file) ? 0.6 : 1, cursor: (loading || !file) ? "not-allowed" : "pointer", position: "relative" }}
              >
                {loading ? (uploadStatus || t.measurements.analyzingBtn[lang]) : t.measurements.analyzeBtn[lang]}
              </button>
            </form>

            {error && (
              <div style={{ marginTop: 20, padding: "14px 18px", border: "1px solid #5a2020", background: "#1a0808", color: "#e88", fontSize: "0.82rem", lineHeight: 1.6 }}>
                {error}
              </div>
            )}

            {result?.comingSoon && (
              <div style={{
                marginTop: 24, padding: "24px 28px",
                border: "1px solid var(--gold)", background: "var(--bg-2)",
                display: "flex", alignItems: "flex-start", gap: 16,
              }}>
                <div style={{ width: 8, height: 8, border: "1px solid var(--gold)", transform: "rotate(45deg)", flexShrink: 0, marginTop: 4 }} />
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.8, margin: 0 }}>
                  {t.measurements.comingSoon[lang]}
                </p>
              </div>
            )}

            {result && !result.comingSoon && (
              <div style={{ marginTop: 40, border: "1px solid var(--gold)", padding: 32 }}>
                <h4 style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                  {t.measurements.resultTitle[lang]}
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  {measureFields.filter(([, v]) => v).map(([label, value]) => (
                    <div key={label} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
                      <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>{label}</div>
                      <div style={{ color: "var(--text)", fontSize: "1rem" }}>{value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "var(--bg-2)", border: "1px solid var(--gold)", padding: "20px 24px", textAlign: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>{t.measurements.recSize[lang]}</div>
                  <div className="serif" style={{ fontSize: "3rem", color: "var(--gold)", fontWeight: 300 }}>{result.recommendedSize}</div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>{t.measurements.notes[lang]}</div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>{result.notes}</p>
                </div>
                <div>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>{t.measurements.confidence[lang]}</div>
                  <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", fontStyle: "italic" }}>{result.confidence}</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Size Calculator ── */}
          <div>
            <h3 style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 32 }}>
              {t.measurements.calcTitle[lang]}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: 28, lineHeight: 1.7 }}>
              {t.measurements.calcSub[lang]}
            </p>

            <div className="calc-fields-grid">
              {FIELD_GROUPS.map(([phKey, stateKey, label, guideKey]) => (
                <div key={stateKey} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                      {label}
                    </span>
                    <HelpIcon measurementKey={guideKey} />
                  </div>
                  <input
                    className="field"
                    type="number"
                    step="0.5"
                    min="0"
                    inputMode="decimal"
                    placeholder={(t.measurements as Record<string, { en: string; fr: string; es: string }>)[phKey][lang]}
                    value={fields[stateKey]}
                    onChange={e => setField(stateKey, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
              <select className="field" value={fit} onChange={e => setFit(e.target.value)}>
                <option value="">{t.measurements.fitDefault[lang]}</option>
                <option value="slim">{t.measurements.fitSlim[lang]}</option>
                <option value="regular">{t.measurements.fitRegular[lang]}</option>
                <option value="loose">{t.measurements.fitLoose[lang]}</option>
              </select>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input className="field" type="text" placeholder={t.measurements.calcNamePH[lang]} value={calcName} onChange={e => setCalcName(e.target.value)} />
                <input className="field" type="email" inputMode="email" placeholder={t.measurements.calcEmailPH[lang]} value={calcEmail} onChange={e => setCalcEmail(e.target.value)} />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={calcLoading}
              className="btn-primary"
              style={{ marginTop: 20, width: "100%", opacity: calcLoading ? 0.6 : 1, cursor: calcLoading ? "not-allowed" : "pointer" }}
            >
              {t.measurements.calcBtn[lang]}
            </button>

            {calcError && (
              <p style={{ marginTop: 14, color: "#e88", fontSize: "0.82rem" }}>{calcError}</p>
            )}

            {calcResult && (
              <div style={{ marginTop: 24, padding: "24px 28px", border: "1px solid var(--gold)", background: "var(--bg-2)" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>{t.measurements.calcResultTitle[lang]}</div>
                <div className="serif" style={{ fontSize: "2.5rem", color: "var(--gold)", fontWeight: 300, marginBottom: 8 }}>{calcResult.size}</div>
                {fit && <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>{calcResult.fitLabel}</div>}
              </div>
            )}

            {calcSuccess && (
              <div style={{
                marginTop: 16, padding: "16px 20px",
                border: "1px solid var(--gold)", background: "var(--bg-2)",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{ width: 6, height: 6, background: "var(--gold)", transform: "rotate(45deg)", flexShrink: 0 }} />
                <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.7, margin: 0 }}>
                  {calcSuccess}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .measurements-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .calc-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .upload-btn {
          background: var(--bg-2);
          border: 1px solid var(--border);
          color: var(--text-muted);
          padding: 24px 16px;
          cursor: pointer;
          font-family: inherit;
          text-align: center;
          transition: border-color 0.2s, color 0.2s;
          width: 100%;
          /* Large tap target for mobile */
          min-height: 88px;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .upload-btn:hover, .upload-btn:focus {
          border-color: var(--gold);
          color: var(--gold);
          outline: none;
        }
        .upload-btn:active { opacity: 0.75; }
        @media(max-width:768px){
          #measurements { padding: 80px 24px !important; }
          #measurements .section-inner > div:nth-child(2) {
            grid-template-columns: 1fr !important; gap: 2px !important;
          }
          #measurements .section-inner > div:nth-child(2) > div { padding: 28px 24px !important; }
          .measurements-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .calc-fields-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
