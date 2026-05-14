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

  const { name, email, subject, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const timestamp = new Date().toISOString();
  const type = subject === "sur-mesure" ? "Sur-Mesure Order" : "Contact Form";

  // ── Email via Resend ───────────────────────────────────────────────────────
  try {
    await resend.emails.send({
      from: "HavrePlacide <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      subject: `[HavrePlacide] New ${type} from ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f0ece4;padding:40px;border:1px solid #2a2a2a;">
          <div style="border-bottom:1px solid #c9a96e;padding-bottom:20px;margin-bottom:28px;">
            <h1 style="font-size:1.4rem;font-weight:300;color:#c9a96e;margin:0;letter-spacing:0.15em;">HAVREPLACIDE</h1>
            <p style="font-size:0.75rem;letter-spacing:0.3em;text-transform:uppercase;color:#7a7570;margin:6px 0 0;">New ${type}</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;width:120px;">NAME</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">EMAIL</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">TYPE</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${subject ?? "general"}</td></tr>
          </table>
          <div style="margin-top:28px;">
            <p style="color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;margin-bottom:10px;">MESSAGE</p>
            <div style="background:#111;border-left:2px solid #c9a96e;padding:16px 20px;font-size:0.9rem;line-height:1.8;white-space:pre-wrap;">${message}</div>
          </div>
          <p style="margin-top:32px;font-size:0.7rem;color:#444;letter-spacing:0.15em;">Received ${timestamp}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Resend error:", err);
  }

  // ── Google Sheets ──────────────────────────────────────────────────────────
  await appendToSheet([timestamp, type, name, email, subject ?? "general", message]);

  res.status(200).json({ success: true, message: "Message received. We'll be in touch within 24 hours." });
}
