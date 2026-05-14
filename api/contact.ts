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

  console.log(`\n📬 Contact | ${new Date().toISOString()}`);
  console.log(`Name: ${name} | Email: ${email} | Subject: ${subject ?? "general"}`);
  console.log(`Message:\n${message}\n`);

  res.status(200).json({ success: true, message: "Message received. We'll be in touch within 24 hours." });
}
