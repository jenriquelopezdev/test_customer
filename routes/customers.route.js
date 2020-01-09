const express = require("express");
const asyncHandler = require("express-async-handler");
const customersCtrl = require("../controllers/customers.controller");

const router = express.Router();
module.exports = router;

router
  .route("/")
  .post(asyncHandler(insert));

async function insert(req, res) {
  try {
    let customers = await customersCtrl.insert(req.body);
    if (customers.error != null) {
      res.boom.badRequest(customers.error);
    } else {
      res.json(customers);
    }
  } catch (err) {
    res.boom.boomify(err);
  }
}
