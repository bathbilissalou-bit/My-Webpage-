import Anthropic from "@anthropic-ai/sdk";

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
  "inseam": "e.g. 30\\"",
  "shoulder": "e.g. 17\\"",
  "height": "e.g. 70\\"",
  "recommendedSize": "S, M, L, or XL",
  "notes": "professional fit notes and caveats",
  "confidence": "Low/Medium/High — brief reason"
}
Omit fields you cannot estimate. Be honest about confidence.`,
          },
        ],
      }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const result = JSON.parse(text.replace(/```json|```/g, "").trim());
    res.status(200).json(result);
  } catch (err) {
    console.error("Measurement analysis error:", err);
    res.status(500).json({ error: "Analysis failed. Please try again." });
  }
}
