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

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});