const { sendContactEmail } = require("../services/emailService");

const contactHandler = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  try {
    const data = await sendContactEmail({ name, email, phone, subject, message });
    console.log("Email sent:", data);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
};

module.exports = { contactHandler };