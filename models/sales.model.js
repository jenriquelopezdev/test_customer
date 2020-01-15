const Sequelize = require("sequelize");
const db = require("../database/db.js");

const Products = require("./products.model");
const Customers = require("./customers.model");

const sales = db.sequelize.define(
  "SALES",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Customers,
        key: "id"
      }
    },
    product_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Products,
        key: "id"
      }
    },
    quantity: {
      type: Sequelize.INTEGER
    }
  }
);

sales.belongsTo(Products, { foreignKey: "product_id" });
sales.belongsTo(Customers, { foreignKey: "customer_id" });

module.exports = sales;
