const express = require("express");
const asyncHandler = require("express-async-handler");
const salesCtrl = require("../controllers/sales.controller");

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
    let sales = await salesCtrl.insert(req.body);
    if (sales.error != null) {
      res.boom.badRequest(sales.error);
    } else {
      res.json(sales);
    }
  } catch (err) {
    res.boom.boomify(err);
  }
}

async function getAll(req, res) {
  try {
    let sales = await salesCtrl.getSales();
    res.json(sales);
  } catch (err) {
    res.boom.badRequest("The records was not found.");
  }
}

async function getById(req, res) {
  try {
    let id = req.params.id;
    let sales = await salesCtrl.getById(id);
    if (sales == null) {
      res.boom.badRequest("The record was not found.");
    } else {
      res.json(sales);
    }
  } catch (err) {
    res.boom.badRequest("The record was not found.");
  }
}

async function updateById(req, res) {
  try {
    let id = req.params.id;
    let sales = await salesCtrl.updateById(id, req.body);
    if (sales.error != null) {
      res.boom.badRequest(sales.error);
    } else {
      res.json(sales);
    }
  } catch (err) {
    res.boom.badRequest("The record was not found.");
  }
}

async function deleteById(req, res) {
  try {
    let sales = await salesCtrl.deleteById(req.params.id);
    res.json(sales);
  } catch (err) {
    res.boom.badRequest("The record was not found.");
  }
}
