const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactEmail = async ({ name, email, phone, subject, message }) => {
  return await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: email,
    bcc: "roshanpatil2912.rp@gmail.com",
    subject: subject,
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
};

module.exports = { sendContactEmail };