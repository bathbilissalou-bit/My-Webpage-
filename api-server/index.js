import "dotenv/config";
import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── AI Measurements Analysis ─────────────────────────────────────────────────
app.post("/api/measurements/analyze", async (req, res) => {
  const { imageBase64, mimeType, name, email, notes } = req.body;
  if (!imageBase64 || !mimeType) {
    return res.status(400).json({ error: "Image is required." });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(200).json({ comingSoon: true });
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mimeType, data: imageBase64 } },
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
  "inseam": "e.g. 30\\"",
  "shoulder": "e.g. 17\\"",
  "height": "e.g. 70\\"",
  "recommendedSize": "S, M, L, or XL",
  "notes": "professional fit notes and caveats",
  "confidence": "Low/Medium/High — brief reason"
}
Omit fields you cannot estimate. Be honest about confidence.`
          }
        ]
      }]
    });
    const text = response.content[0].type === "text" ? response.content[0].text : "";
    let result;
    try {
      result = JSON.parse(text.replace(/```json|```/g, "").trim());
    } catch {
      return res.status(200).json({
        comingSoon: false,
        recommendedSize: "—",
        notes: "We received your photo but could not parse the measurements automatically. Our team will review and follow up.",
        confidence: "Manual review required",
      });
    }
    res.json(result);
  } catch (err) {
    console.error("Measurement error:", err?.message ?? err);
    res.status(500).json({ error: "Analysis failed. Please try again." });
  }
});

// ─── Contact Form ─────────────────────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  console.log(`\n📬 Contact Form — ${new Date().toLocaleString()}`);
  console.log(`Name: ${name} | Email: ${email} | Subject: ${subject}`);
  console.log(`Message: ${message}\n`);
  res.json({ success: true, message: "Message received. We'll be in touch within 24 hours." });
});

// ─── Health ───────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ HavrePlacide API running on port ${PORT}`));
