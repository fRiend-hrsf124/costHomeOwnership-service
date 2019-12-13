/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { dbConn } = require('../database/index.js');

const updateClientBundle = async () => {
  const url = 'https://hrsf-fec-nz.s3-us-west-2.amazonaws.com/bundle.js';
  const bundleFilePath = path.resolve(__dirname, '..', 'public', 'bundle.js');
  const writer = fs.createWriteStream(bundleFilePath);

  const res = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  res.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      console.log('bundle updated from s3');
      resolve();
    });
    writer.on('error', (err) => {
      console.log('error retrieving bundle from s3');
      console.log(err);
      reject();
    });
  });
};

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
  updateClientBundle,
  getPropertyData,
  getRates,
};
