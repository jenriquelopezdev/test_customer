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

module.exports = {};