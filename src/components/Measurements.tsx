import { useState, useRef } from "react";
import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";

interface MeasurementResult {
  chest?: string; waist?: string; hips?: string; inseam?: string;
  shoulder?: string; height?: string;
  recommendedSize: string; notes: string; confidence: string;
  comingSoon?: boolean;
}

export function Measurements() {
  const { lang } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MeasurementResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [calcHeight, setCalcHeight] = useState("");
  const [fit, setFit] = useState("");
  const [calcResult, setCalcResult] = useState<{ size: string; fitLabel: string } | null>(null);
  const [calcError, setCalcError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { setError(t.measurements.uploadError[lang]); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      const imageBase64 = btoa(binary);
      const response = await fetch("/api/measurements/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, mimeType: file.type, name, email, notes }),
      });
      if (!response.ok) { const err = await response.json(); throw new Error(err.error || t.measurements.genericError[lang]); }
      setResult(await response.json());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.measurements.genericError[lang]);
    } finally {
      setLoading(false);
    }
  };

  const calculateSize = () => {
    if (!chest || !waist || !fit) { setCalcError(t.measurements.calcError[lang]); setCalcResult(null); return; }
    setCalcError("");
    const c = parseFloat(chest);
    const size = c <= 36 ? "Small" : c <= 40 ? "Medium" : c <= 44 ? "Large" : "X-Large";
    const fitLabel = fit === "slim" ? t.measurements.fitSlim[lang] : fit === "regular" ? t.measurements.fitRegular[lang] : t.measurements.fitLoose[lang];
    setCalcResult({ size, fitLabel });
  };

  const measureFields = [
    [t.measurements.chest[lang], result?.chest],
    [t.measurements.waist[lang], result?.waist],
    [t.measurements.hips[lang], result?.hips],
    [t.measurements.inseam[lang], result?.inseam],
    [t.measurements.shoulder[lang], result?.shoulder],
    [t.measurements.height[lang], result?.height],
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          {/* AI Photo Form */}
          <div>
            <h3 style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 32 }}>
              {t.measurements.aiTitle[lang]}
            </h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input className="field" type="text" placeholder={t.measurements.namePH[lang]} value={name} onChange={e => setName(e.target.value)} />
              <input className="field" type="email" placeholder={t.measurements.emailPH[lang]} value={email} onChange={e => setEmail(e.target.value)} />
              <div>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
                  {t.measurements.uploadLabel[lang]}
                </label>
                <input ref={fileRef} type="file" accept="image/*" required
                  onChange={e => setFile(e.target.files?.[0] ?? null)}
                  style={{ color: "var(--text-muted)", fontSize: "0.8rem", width: "100%" }} />
                {file && <p style={{ fontSize: "0.75rem", color: "var(--gold)", marginTop: 8 }}>✓ {file.name}</p>}
              </div>
              <textarea className="field" placeholder={t.measurements.notesPH[lang]}
                value={notes} onChange={e => setNotes(e.target.value)}
                style={{ height: 100, resize: "vertical" }} />
              <button type="submit" disabled={loading} className="btn-primary"
                style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? t.measurements.analyzingBtn[lang] : t.measurements.analyzeBtn[lang]}
              </button>
            </form>

            {error && (
              <div style={{ marginTop: 20, padding: 16, border: "1px solid #5a2020", background: "#1a0808", color: "#e88", fontSize: "0.85rem" }}>
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

          {/* Size Calculator */}
          <div>
            <h3 style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 32 }}>
              {t.measurements.calcTitle[lang]}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: 28, lineHeight: 1.7 }}>
              {t.measurements.calcSub[lang]}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input className="field" type="number" placeholder={t.measurements.chestPH[lang]} value={chest} onChange={e => setChest(e.target.value)} />
              <input className="field" type="number" placeholder={t.measurements.waistPH[lang]} value={waist} onChange={e => setWaist(e.target.value)} />
              <input className="field" type="number" placeholder={t.measurements.heightPH[lang]} value={calcHeight} onChange={e => setCalcHeight(e.target.value)} />
              <select className="field" value={fit} onChange={e => setFit(e.target.value)}>
                <option value="">{t.measurements.fitDefault[lang]}</option>
                <option value="slim">{t.measurements.fitSlim[lang]}</option>
                <option value="regular">{t.measurements.fitRegular[lang]}</option>
                <option value="loose">{t.measurements.fitLoose[lang]}</option>
              </select>
              <button onClick={calculateSize} className="btn-primary">{t.measurements.calcBtn[lang]}</button>
            </div>
            {calcError && <p style={{ marginTop: 16, color: "#e88", fontSize: "0.82rem" }}>{calcError}</p>}
            {calcResult && (
              <div style={{ marginTop: 24, padding: "24px 28px", border: "1px solid var(--gold)", background: "var(--bg-2)" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>{t.measurements.calcResultTitle[lang]}</div>
                <div className="serif" style={{ fontSize: "2.5rem", color: "var(--gold)", fontWeight: 300, marginBottom: 8 }}>{calcResult.size}</div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>{calcResult.fitLabel}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #measurements { padding: 80px 24px !important; }
          #measurements .section-inner > div:nth-child(2) {
            grid-template-columns: 1fr !important; gap: 2px !important;
          }
          #measurements .section-inner > div:nth-child(2) > div { padding: 28px 24px !important; }
          #measurements .section-inner > div:last-child { grid-template-columns: 1fr !important; gap: 48px !important; }
          #measurements .section-inner > div:last-child > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
