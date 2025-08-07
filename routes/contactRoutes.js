const express = require("express");
const router = express.Router();
const { contactHandler } = require("../controllers/contactController");

router.post("/contact", contactHandler);

module.exports = router;