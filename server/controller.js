const db = require('../database/index.js');

const getPropertyData = (id) => {
  const query = 'SELECT * FROM properties WHERE property_id = ?';
  return db.promise().execute(query, [id]);
};

const getRates = (cost, zip) => {

};

module.exports = {
  getPropertyData,
  getRates,
};
