const Sequelize = require('../database/index.js');

const getPropertyData = () => Sequelize.find();

module.exports = {
  getPropertyData,
};
