const express = require("express");
const customerRoutes = require("./customers.route");
const productRoutes = require("./products.route");

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

router.use("/customer", customerRoutes);
router.use("/product", productRoutes);

router.get("/routes", (req, res) =>
  res.send({
    "/api": ["health-check", "customer", "product"]
  })
);

module.exports = router;
