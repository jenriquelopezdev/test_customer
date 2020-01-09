const Joi = require("@hapi/joi");
const Products = require("../models/products.model");

const productSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  provider: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  currency: Joi.string()
    .min(1)
    .max(2)
    .required(),
  price: Joi.number().required(),
  stock: Joi.number()
    .integer()
    .required()
});

const productSchemaUpdate = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  provider: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  currency: Joi.string()
    .min(1)
    .max(2),
  price: Joi.number(),
  stock: Joi.number().integer()
});

module.exports = {
  insert,
  getProducts,
  getById,
  updateById,
  deleteById
};

async function insert(product) {
  try {
    product = await Joi.validate(product, productSchema, {
      abortEarly: false
    });
    return await Products.create(product);
  } catch (err) {
    return {
      error: err.message
    };
  }
}

async function getProducts() {
  return await Products.findAll();
}

async function getById(id) {
  return await Products.findOne({
    where: {
      id: id
    }
  });
}

async function updateById(id, product) {
  try {
    product = await Joi.validate(product, productSchemaUpdate, {
      abortEarly: false
    });
    return await Products.update(product, { where: { id: id } });
  } catch (err) {
    return {
      error: err.message
    };
  }
  ß;
}

async function deleteById(id) {
  const product = await Products.findOne({
    where: {
      id: id
    }
  });
  return await product.destroy();
}
