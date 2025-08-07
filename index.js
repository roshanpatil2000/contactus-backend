require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = require("./config/corsOptions");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 2912;

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
// app.get("/", (req, res) => res.send("Express on Vercel"));

// app.use("/", contactRoutes);



app.get('/', (req, res) => {
    const secret = Math.floor(Math.random() * 100)
    res.json({ secret })
});
app.post("/contact", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All required fields must be filled." });
    }

    try {
        const data = await resend.emails.send({
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

        console.log("Resend Response:", data);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Resend Error:", error);
        res.status(500).json({ success: false, error: "Failed to send email." });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});