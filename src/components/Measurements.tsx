import { useState, useRef } from "react";

interface MeasurementResult {
  chest?: string;
  waist?: string;
  hips?: string;
  inseam?: string;
  shoulder?: string;
  height?: string;
  recommendedSize: string;
  notes: string;
  confidence: string;
}

export function Measurements() {
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
    if (!file) { setError("Please upload a photo to analyze."); return; }
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
      if (!response.ok) { const err = await response.json(); throw new Error(err.error || "Analysis failed."); }
      setResult(await response.json());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const calculateSize = () => {
    if (!chest || !waist || !fit) { setCalcError("Please fill in all required fields."); setCalcResult(null); return; }
    setCalcError("");
    const c = parseFloat(chest);
    const size = c <= 36 ? "Small" : c <= 40 ? "Medium" : c <= 44 ? "Large" : "X-Large";
    const fitLabel = fit === "slim" ? "Slim Fit" : fit === "regular" ? "Regular Fit" : "Loose Fit";
    setCalcResult({ size, fitLabel });
  };

  return (
    <section id="measurements" style={{ background: "var(--bg)", padding: "100px 40px" }}>
      <div className="section-inner">
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p className="section-label">Perfect Fit</p>
          <h2 className="section-title">Get Measured</h2>
          <div className="divider" style={{ margin: "24px auto" }} />
          <p style={{ color: "var(--text-muted)", maxWidth: 500, margin: "0 auto", fontSize: "0.85rem" }}>
            Upload a photo and our AI will estimate your body measurements for a perfect fit, or use our size calculator below.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, marginBottom: 80, background: "var(--border)" }}>
          {[
            { num: "01", title: "Prepare", desc: "Wear fitted clothing and stand straight in good lighting." },
            { num: "02", title: "Capture", desc: "Upload a clear front-facing photo showing your full body." },
            { num: "03", title: "Receive", desc: "Get your estimated measurements instantly from our AI." },
          ].map(s => (
            <div key={s.num} style={{ background: "var(--bg)", padding: "40px 32px", textAlign: "center" }}>
              <div className="serif" style={{ fontSize: "2.5rem", color: "var(--gold)", fontWeight: 300, marginBottom: 16 }}>{s.num}</div>
              <h3 style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text)", marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          {/* AI Photo Form */}
          <div>
            <h3 style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 32 }}>
              AI Photo Analysis
            </h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input className="field" type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
              <input className="field" type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} />
              <div>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
                  Upload Photo
                </label>
                <input ref={fileRef} type="file" accept="image/*" required
                  onChange={e => setFile(e.target.files?.[0] ?? null)}
                  style={{ color: "var(--text-muted)", fontSize: "0.8rem", width: "100%" }} />
                {file && <p style={{ fontSize: "0.75rem", color: "var(--gold)", marginTop: 8 }}>✓ {file.name}</p>}
              </div>
              <textarea className="field" placeholder="Additional notes (height, weight, fit preferences)..."
                value={notes} onChange={e => setNotes(e.target.value)}
                style={{ height: 100, resize: "vertical" }} />
              <button type="submit" disabled={loading} className="btn-primary"
                style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? "Analyzing..." : "Analyze Measurements"}
              </button>
            </form>

            {error && (
              <div style={{ marginTop: 20, padding: 16, border: "1px solid #5a2020", background: "#1a0808", color: "#e88", fontSize: "0.85rem" }}>
                {error}
              </div>
            )}

            {result && (
              <div style={{ marginTop: 40, border: "1px solid var(--gold)", padding: 32 }}>
                <h4 style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                  Your Measurements
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  {[
                    ["Chest", result.chest], ["Waist", result.waist],
                    ["Hips", result.hips], ["Inseam", result.inseam],
                    ["Shoulder", result.shoulder], ["Height", result.height],
                  ].filter(([, v]) => v).map(([label, value]) => (
                    <div key={label as string} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
                      <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>{label}</div>
                      <div style={{ color: "var(--text)", fontSize: "1rem" }}>{value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "var(--bg-2)", border: "1px solid var(--gold)", padding: "20px 24px", textAlign: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>Recommended Size</div>
                  <div className="serif" style={{ fontSize: "3rem", color: "var(--gold)", fontWeight: 300 }}>{result.recommendedSize}</div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>Notes</div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>{result.notes}</p>
                </div>
                <div>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>Confidence</div>
                  <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", fontStyle: "italic" }}>{result.confidence}</p>
                </div>
              </div>
            )}
          </div>

          {/* Size Calculator */}
          <div>
            <h3 style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 32 }}>
              Size Calculator
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: 28, lineHeight: 1.7 }}>
              Already know your measurements? Enter them below for an instant size recommendation.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input className="field" type="number" placeholder="Chest (inches)" value={chest} onChange={e => setChest(e.target.value)} />
              <input className="field" type="number" placeholder="Waist (inches)" value={waist} onChange={e => setWaist(e.target.value)} />
              <input className="field" type="number" placeholder="Height (inches)" value={calcHeight} onChange={e => setCalcHeight(e.target.value)} />
              <select className="field" value={fit} onChange={e => setFit(e.target.value)}>
                <option value="">Select Fit Style</option>
                <option value="slim">Slim Fit</option>
                <option value="regular">Regular Fit</option>
                <option value="loose">Loose Fit</option>
              </select>
              <button onClick={calculateSize} className="btn-primary">Get My Size</button>
            </div>
            {calcError && <p style={{ marginTop: 16, color: "#e88", fontSize: "0.82rem" }}>{calcError}</p>}
            {calcResult && (
              <div style={{ marginTop: 24, padding: "24px 28px", border: "1px solid var(--gold)", background: "var(--bg-2)" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>Your Size</div>
                <div className="serif" style={{ fontSize: "2.5rem", color: "var(--gold)", fontWeight: 300, marginBottom: 8 }}>{calcResult.size}</div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>{calcResult.fitLabel}</div>
              </div>
            )}

            {/* Size guide */}
            <div style={{ marginTop: 48, paddingTop: 40, borderTop: "1px solid var(--border)" }}>
              <h4 style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 20 }}>
                Size Guide (Chest in inches)
              </h4>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                <thead>
                  <tr>
                    {["Size", "Chest", "Waist", "Hips"].map(h => (
                      <th key={h} style={{ padding: "10px 0", textAlign: "left", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["S", "34–36", "28–30", "36–38"],
                    ["M", "37–40", "31–33", "39–41"],
                    ["L", "41–44", "34–36", "42–44"],
                    ["XL", "45–48", "37–40", "45–48"],
                  ].map(([size, ...vals]) => (
                    <tr key={size}>
                      <td style={{ padding: "12px 0", color: "var(--gold)", fontWeight: 500, borderBottom: "1px solid var(--border)" }}>{size}</td>
                      {vals.map((v, i) => (
                        <td key={i} style={{ padding: "12px 0", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          #measurements { padding: 80px 24px !important; }
          #measurements .section-inner > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 2px !important;
          }
          #measurements .section-inner > div:nth-child(2) > div {
            padding: 28px 24px !important;
          }
          #measurements .section-inner > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          #measurements .section-inner > div:last-child > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
