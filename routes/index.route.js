const express = require("express");

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

router.get("/routes", (req, res) =>
  res.send({
    "/api": ["health-check"]
  })
);
ß
module.exports = router;
