const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define("PRODUCTS", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  currency: {
    type: Sequelize.ENUM,
    values: ['Q', '$']
  },
  provider: {
    type: Sequelize.STRING
  },
  stock: {
    type: Sequelize.INTEGER
  }
});
