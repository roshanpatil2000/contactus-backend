import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      bcc: "roshanpatil2912.rp@gmail.com",
      subject,
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for contacting us. Here's a copy of your message:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || "N/A"}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>We’ll get back to you shortly.</p>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Resend Error:", error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
}