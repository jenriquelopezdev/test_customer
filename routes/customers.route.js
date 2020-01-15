const express = require("express");
const asyncHandler = require("express-async-handler");
const customersCtrl = require("../controllers/customers.controller");

const router = express.Router();
module.exports = router;

router
  .route("/")
  .post(asyncHandler(insert))
  .get(asyncHandler(getAll));
router
  .route("/:id")
  .get(asyncHandler(getById))
  .put(asyncHandler(updateById))
  .delete(asyncHandler(deleteById));

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

async function getAll(req, res) {
  try {
    let customers = await customersCtrl.getCustomers();
    res.json(customers);
  } catch (err) {
    res.boom.badRequest("The records was not found.");
  }
}

async function getById(req, res) {
  try {
    let id = req.params.id;
    let customers = await customersCtrl.getById(id);
    if (customers == null) {
      res.boom.badRequest("The record was not found.");
    } else {
      res.json(customers);
    }
  } catch (err) {
    res.boom.badRequest("The record was not found.");
  }
}

async function updateById(req, res) {
  try {
    let id = req.params.id;
    let customers = await customersCtrl.updateById(id, req.body);
    if (customers.error != null) {
      res.boom.badRequest(customers.error);
    } else {
      res.json(customers);
    }
  } catch (err) {
    res.boom.badRequest("The record was not found.");
  }
}

async function deleteById(req, res) {
  try {
    let customers = await customersCtrl.deleteById(req.params.id);
    res.json(customers);
  } catch (err) {
    res.boom.badRequest("The record was not found.");
  }
}
