const { dbConn } = require('../database/index.js');

const getPropertyData = async (id) => {
  const query = `SELECT * FROM properties AS p JOIN zips AS z
    ON p.zip_code = z.zip_code
    WHERE property_id = ?`;

  const conn = await dbConn;
  return conn.execute(query, [id]);
};

const getRates = async (cost, zip, term, type, downPay, credit, origYear) => {
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

  const conn = await dbConn;

  const financedCost = cost * ((100 - downPay) / 100);

  return conn.execute(query, [
    financedCost,
    financedCost,
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
