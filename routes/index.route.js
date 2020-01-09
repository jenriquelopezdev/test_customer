const express = require("express");
const customerRoutes = require("./customers.route");

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

router.use("/customer", customerRoutes);

router.get("/routes", (req, res) =>
  res.send({
    "/api": ["health-check", "customer"]
  })
);

module.exports = router;
