import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { google } from "googleapis";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = "havreplacide@gmail.com";

async function appendToSheet(row: string[]) {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) return;
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:F",
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    });
  } catch (err) {
    console.error("Sheets append error:", err);
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(200).json({ comingSoon: true });
  }

  const { imageBase64, mimeType, name, email, notes } = req.body ?? {};
  if (!imageBase64 || !mimeType) {
    return res.status(400).json({ error: "Image is required." });
  }

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mimeType, data: imageBase64 },
          },
          {
            type: "text",
            text: `You are a professional clothing measurement expert for HavrePlacide, a luxury fashion brand. Analyze this photo and estimate body measurements.
${notes ? `Customer notes: ${notes}` : ""}
${name ? `Customer: ${name}` : ""}

Respond ONLY with valid JSON, no preamble or markdown:
{
  "chest": "e.g. 38\\"",
  "waist": "e.g. 32\\"",
  "hips": "e.g. 40\\"",
  "shoulder": "e.g. 17\\"",
  "neck": "e.g. 15\\"",
  "sleeveLength": "e.g. 25\\"",
  "bicep": "e.g. 13\\"",
  "wrist": "e.g. 6.5\\"",
  "backLength": "e.g. 18\\"",
  "inseam": "e.g. 30\\"",
  "height": "e.g. 70\\"",
  "recommendedSize": "S, M, L, or XL",
  "notes": "professional fit notes and caveats",
  "confidence": "Low, Medium, or High with brief reason"
}
Omit fields you cannot estimate. Be honest about confidence.`,
          },
        ],
      }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const result = JSON.parse(text.replace(/```json|```/g, "").trim());

    const timestamp = new Date().toISOString();
    const measurementSummary = [
      result.chest        ? `Chest: ${result.chest}`               : "",
      result.waist        ? `Waist: ${result.waist}`               : "",
      result.hips         ? `Hips: ${result.hips}`                 : "",
      result.shoulder     ? `Shoulder: ${result.shoulder}`         : "",
      result.neck         ? `Neck: ${result.neck}`                 : "",
      result.sleeveLength ? `Sleeve: ${result.sleeveLength}`       : "",
      result.bicep        ? `Bicep: ${result.bicep}`               : "",
      result.wrist        ? `Wrist: ${result.wrist}`               : "",
      result.backLength   ? `Back Length: ${result.backLength}`    : "",
      result.inseam       ? `Inseam: ${result.inseam}`             : "",
      result.height       ? `Height: ${result.height}`             : "",
      `Size: ${result.recommendedSize}`,
      `Confidence: ${result.confidence}`,
      result.notes        ? `Notes: ${result.notes}`               : "",
    ].filter(Boolean).join(" | ");

    // ── Email via Resend ─────────────────────────────────────────────────────
    try {
      await resend.emails.send({
        from: "HavrePlacide <onboarding@resend.dev>",
        to: NOTIFY_EMAIL,
        subject: `[HavrePlacide] New Measurement Analysis${name ? ` — ${name}` : ""}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f0ece4;padding:40px;border:1px solid #2a2a2a;">
            <div style="border-bottom:1px solid #c9a96e;padding-bottom:20px;margin-bottom:28px;">
              <h1 style="font-size:1.4rem;font-weight:300;color:#c9a96e;margin:0;letter-spacing:0.15em;">HAVREPLACIDE</h1>
              <p style="font-size:0.75rem;letter-spacing:0.3em;text-transform:uppercase;color:#7a7570;margin:6px 0 0;">New Measurement Analysis</p>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;width:140px;">NAME</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${name || "Anonymous"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">EMAIL</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${email || "Not provided"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">SIZE</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:1.2rem;color:#c9a96e;">${result.recommendedSize}</td></tr>
              ${result.chest        ? `<tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">CHEST / BUST</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${result.chest}</td></tr>` : ""}
              ${result.waist       ? `<tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">WAIST</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${result.waist}</td></tr>` : ""}
              ${result.hips        ? `<tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">HIPS</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${result.hips}</td></tr>` : ""}
              ${result.shoulder    ? `<tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">SHOULDER WIDTH</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${result.shoulder}</td></tr>` : ""}
              ${result.neck        ? `<tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">NECK</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${result.neck}</td></tr>` : ""}
              ${result.sleeveLength ? `<tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">SLEEVE LENGTH</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${result.sleeveLength}</td></tr>` : ""}
              ${result.bicep       ? `<tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">BICEP</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${result.bicep}</td></tr>` : ""}
              ${result.wrist       ? `<tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">WRIST</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${result.wrist}</td></tr>` : ""}
              ${result.backLength  ? `<tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">BACK LENGTH</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${result.backLength}</td></tr>` : ""}
              ${result.inseam      ? `<tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">INSEAM</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${result.inseam}</td></tr>` : ""}
              ${result.height      ? `<tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">HEIGHT</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${result.height}</td></tr>` : ""}
              <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">CONFIDENCE</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${result.confidence}</td></tr>
            </table>
            ${result.notes ? `<div style="margin-top:28px;"><p style="color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;margin-bottom:10px;">FIT NOTES</p><div style="background:#111;border-left:2px solid #c9a96e;padding:16px 20px;font-size:0.9rem;line-height:1.8;">${result.notes}</div></div>` : ""}
            ${notes ? `<div style="margin-top:20px;"><p style="color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;margin-bottom:10px;">CUSTOMER NOTES</p><div style="background:#111;border-left:2px solid #444;padding:16px 20px;font-size:0.9rem;line-height:1.8;">${notes}</div></div>` : ""}
            <p style="margin-top:32px;font-size:0.7rem;color:#444;letter-spacing:0.15em;">Received ${timestamp}</p>
          </div>
        `,
      });
    } catch (err) {
      console.error("Resend error:", err);
    }

    // ── Google Sheets ────────────────────────────────────────────────────────
    await appendToSheet([
      timestamp,
      "Measurement Analysis",
      name || "Anonymous",
      email || "",
      "AI Photo Analysis",
      measurementSummary,
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.error("Measurement analysis error:", err);
    res.status(500).json({ error: "Analysis failed. Please try again." });
  }
}
