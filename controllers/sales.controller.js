const Joi = require("@hapi/joi");
const Sales = require("../models/sales.model");

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
  updateById,
  deleteById
};

async function insert(sale) {
  try {
    sale = await Joi.validate(sale, saleSchema, {
      abortEarly: false
    });
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
  return await Sales.findAll();
}

async function getById(id) {
  return await Sales.findOne({
    where: {
      id: id
    }
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
