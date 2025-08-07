const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const corsOptions = require("./config/corsOptions");

// Apply middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
    res.json({ name: "/api1" });
});

app.get("/2", (req, res) => {
    res.json({ name: "/api2" });
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
            subject,
            html: `<p>Hello ${name}, ...</p>`
        });

        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to send email." });
    }
});

// ✅ Export the app as a serverless function
module.exports = app;