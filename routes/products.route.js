const express = require("express");
const asyncHandler = require("express-async-handler");
const productCtrl = require("../controllers/products.controller");

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
    let product = await productCtrl.insert(req.body);
    if (product.error != null) {
      res.boom.badRequest(product.error);
    } else {
      res.json(product);
    }
  } catch (err) {
    res.boom.boomify(err);
  }
}

async function getAll(req, res) {
  try {
    let product = await productCtrl.getProducts();
    res.json(product);
  } catch (err) {
    res.boom.badRequest("The records was not found.");
  }
}

async function getById(req, res) {
  try {
    let id = req.params.id;
    let product = await productCtrl.getById(id);
    if (product == null) {
      res.boom.badRequest("The record was not found.");
    } else {
      res.json(product);
    }
  } catch (err) {
    res.boom.badRequest("The record was not found.");
  }
}

async function updateById(req, res) {
  try {
    let id = req.params.id;
    let product = await productCtrl.updateById(id, req.body);
    if (product.error != null) {
      res.boom.badRequest(product.error);
    } else {
      res.json(product);
    }
  } catch (err) {
    res.boom.badRequest("The record was not found.");
  }
}

async function deleteById(req, res) {
  try {
    let product = await productCtrl.deleteById(req.params.id);
    res.json(product);
  } catch (err) {
    res.boom.badRequest("The record was not found.");
  }
}
