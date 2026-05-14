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

// ── Commission reference generator ────────────────────────────────────────────
function generateCommissionRef(): string {
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `HP-${ymd}-${rand}`;
}

// ── Commission email template ──────────────────────────────────────────────────
function commissionEmailHtml(name: string, email: string, message: string, ref: string, timestamp: string): string {
  return `
    <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;background:#0a0a0a;color:#f0ece4;padding:40px;border:1px solid #2a2a2a;">
      <div style="border-bottom:1px solid #c9a96e;padding-bottom:20px;margin-bottom:28px;display:flex;justify-content:space-between;align-items:flex-end;">
        <div>
          <h1 style="font-size:1.4rem;font-weight:300;color:#c9a96e;margin:0;letter-spacing:0.15em;">HAVREPLACIDE</h1>
          <p style="font-size:0.75rem;letter-spacing:0.3em;text-transform:uppercase;color:#7a7570;margin:6px 0 0;">New Commission Request</p>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.65rem;letter-spacing:0.2em;color:#7a7570;margin-bottom:4px;">REFERENCE</div>
          <div style="font-size:0.9rem;color:#c9a96e;letter-spacing:0.1em;">${ref}</div>
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;width:130px;">CLIENT</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;">${name}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">EMAIL</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;"><a href="mailto:${email}" style="color:#c9a96e;">${email}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;">STATUS</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-size:0.9rem;color:#c9a96e;">Pending Review — Awaiting Quote</td></tr>
      </table>
      <div style="margin-bottom:28px;">
        <p style="color:#7a7570;font-size:0.8rem;letter-spacing:0.1em;margin-bottom:10px;">COMMISSION DETAILS</p>
        <div style="background:#111;border-left:2px solid #c9a96e;padding:16px 20px;font-size:0.9rem;line-height:1.8;white-space:pre-wrap;">${message}</div>
      </div>
      <div style="background:#111111;border:1px solid #2a2a2a;padding:20px 24px;margin-bottom:24px;">
        <p style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:#7a7570;margin:0 0 10px;">Next Steps</p>
        <ol style="margin:0;padding:0 0 0 18px;color:#f0ece4;font-size:0.85rem;line-height:1.9;">
          <li>Review measurements and design selections</li>
          <li>Confirm appointment date with client</li>
          <li>Send quote and deposit invoice to <a href="mailto:${email}" style="color:#c9a96e;">${email}</a></li>
        </ol>
      </div>
      <p style="margin-top:28px;font-size:0.7rem;color:#444;letter-spacing:0.15em;">Received ${timestamp} · Ref ${ref}</p>
    </div>
  `;
}

// ── Standard contact email template ───────────────────────────────────────────
function contactEmailHtml(name: string, email: string, subject: string, message: string, timestamp: string): string {
  const type = subject === "sur-mesure" ? "Sur-Mesure Order" : "Contact Form";
  return `
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
  `;
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
  const isCommission = subject === "commission-request";

  // ── Generate reference for commission requests ─────────────────────────────
  const commissionRef = isCommission ? generateCommissionRef() : null;

  // ── Email via Resend ───────────────────────────────────────────────────────
  try {
    const emailSubject = isCommission
      ? `[HavrePlacide] Commission Request ${commissionRef} — ${name}`
      : `[HavrePlacide] New ${subject === "sur-mesure" ? "Sur-Mesure Order" : "Contact Form"} from ${name}`;

    const html = isCommission
      ? commissionEmailHtml(name, email, message, commissionRef!, timestamp)
      : contactEmailHtml(name, email, subject, message, timestamp);

    await resend.emails.send({
      from: "HavrePlacide <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: emailSubject,
      html,
    });
  } catch (err) {
    console.error("Resend error:", err);
  }

  // ── Google Sheets ──────────────────────────────────────────────────────────
  const type = isCommission ? "Commission Request" : subject === "sur-mesure" ? "Sur-Mesure Order" : "Contact Form";
  await appendToSheet([timestamp, type, name, email, commissionRef ?? subject ?? "general", message]);

  // ── Response ───────────────────────────────────────────────────────────────
  // commissionRef is returned here so the frontend can display it to the client.
  // When Stripe deposit payments are activated, this ref becomes the payment
  // metadata key and is used to create a Stripe Payment Link or Invoice.
  //
  // Future Stripe flow (not yet active):
  //   const paymentLink = await stripe.paymentLinks.create({ ... });
  //   return res.status(200).json({ success: true, commissionRef, paymentLink: paymentLink.url });
  res.status(200).json({
    success: true,
    commissionRef,
    message: isCommission
      ? "Commission request received. We will review your selections and contact you with a quote and payment details."
      : "Message received. We'll be in touch within 24 hours.",
  });
}
