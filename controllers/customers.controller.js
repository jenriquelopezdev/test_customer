const Joi = require("@hapi/joi");
const Customers = require("../models/customers.model");

const customerSchema = Joi.object({
  fistName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  mobilePhone: Joi.number()
    .integer()
    .required(),
  phone: Joi.number()
    .integer()
    .required()
});

const customerSchemaUpdate = Joi.object({
  fistName: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  email: Joi.string().email({ minDomainSegments: 2 }),
  mobilePhone: Joi.number().integer(),
  phone: Joi.number().integer()
});

module.exports = {
  insert,
  getCustomers,
  getById,
  updateById,
  deleteById
};

async function insert(customer) {
  try {
    customer = await Joi.validate(customer, customerSchema, {
      abortEarly: false
    });
    return await Customers.create(customer);
  } catch (err) {
    return {
      error: err.message
    };
  }
}

async function getCustomers() {
  return await Customers.findAll();
}

async function getById(id) {
  return await Customers.findOne({
    where: {
      id: id
    }
  });
}

async function updateById(id, customer) {
  try {
    customer = await Joi.validate(customer, customerSchemaUpdate, {
      abortEarly: false
    });
    return await Customers.update(customer, { where: { id: id } });
  } catch (err) {
    return {
      error: err.message
    };
  }ß
}

async function deleteById(id) {
  const customer = await Customers.findOne({
    where: {
      id: id
    }
  });
  return await customer.destroy();
}
