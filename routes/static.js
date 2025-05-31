const express = require("express");
const router = express.Router();

router.get("/privacy", (req, res) => {
  res.render("includes/privacy", { title: "Privacy Policy" });
});

router.get("/terms", (req, res) => {
  res.render("includes/terms", { title: "Terms and Conditions" });
});

module.exports = router;
