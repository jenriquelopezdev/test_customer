const Joi = require("@hapi/joi");
const Sales = require("../models/sales.model");
const Product = require("../models/products.model");
const ProductsCtr = require("../controllers/products.controller");

const saleSchema = Joi.object({
  customer_id: Joi.number()
    .integer()
    .required(),
  product_id: Joi.number()
    .integer()
    .required(),
  quantity: Joi.number()
    .integer()
    .required()
});

const saleSchemaUpdate = Joi.object({
  customer_id: Joi.number().integer(),
  product_id: Joi.number().integer(),
  quantity: Joi.number().integer()
});

module.exports = {
  insert,
  getSales,
  getById,
  getByProduct,
  getByCustomer,
  updateById,
  deleteById
};

async function insert(sale) {
  try {
    sale = await Joi.validate(sale, saleSchema, {
      abortEarly: false
    });
    const stock = await ProductsCtr.getStockById(sale.product_id);
    if (stock.dataValues.stock >= sale.quantity) {
      const stockNew = stock.dataValues.stock - sale.quantity;
      await ProductsCtr.updateById(sale.product_id, { stock: stockNew });
    } else {
      return {
        error: "No products in stock."
      };
    }
    return await Sales.create(sale);
  } catch (err) {
    if (err.original.code != null) {
      return {
        error: "Information does not exist"
      };
    } else {
      return {
        error: err.message
      };
    }
  }
}

async function getSales() {
  try {
    return await Sales.findAll({
      order: [["id", "ASC"]],
      include: [{ all: true, nested: true }]
    });
  } catch (err) {
    console.log(err);
  }
}

async function getById(id) {
  return await Sales.findOne({
    where: {
      id: id
    },
    include: [{ all: true, nested: true }]
  });
}

async function getByProduct(product_id) {
  return await Sales.findOne({
    where: {
      product_id: product_id
    },
    include: [{ all: true, nested: true }]
  });
}

async function getByCustomer(customer_id) {
  return await Sales.findOne({
    where: {
      customer_id: customer_id
    },
    include: [{ all: true, nested: true }]
  });
}

async function updateById(id, sale) {
  try {
    sale = await Joi.validate(sale, saleSchemaUpdate, {
      abortEarly: false
    });
    return await Sales.update(sale, { where: { id: id } });
  } catch (err) {
    return {
      error: err.message
    };
  }
  ß;
}

async function deleteById(id) {
  const sale = await Sales.findOne({
    where: {
      id: id
    }
  });
  return await sale.destroy();
}
