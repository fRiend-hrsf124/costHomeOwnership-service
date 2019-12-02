const db = require('../database/index.js');

const getPropertyData = (id) => {
  const query = `SELECT * FROM properties AS p JOIN zips AS z
    ON p.zip_code = z.zip_code
    WHERE property_id = ?`;

  return db.promise().execute(query, [id]);
};

const getRates = (cost, zip, term, type, downPay, credit, origYear) => {
  const query = `SELECT * FROM rates AS r JOIN lenders AS l
    ON r.lender_id = l.lender_id
    WHERE r.cost_low <= ?
    AND r.cost_high >= ?
    AND r.zip_code = ?
    AND r.term = ?
    AND r.loan_type = ?
    AND r.down_payment_min <= ?
    AND r.credit_min <= ?
    AND r.origination_year = ?`;

  return db.promise().execute(query, [
    cost,
    cost,
    zip,
    term,
    type,
    downPay,
    credit,
    origYear,
  ]);
};

module.exports = {
  getPropertyData,
  getRates,
};
