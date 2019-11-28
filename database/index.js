/* eslint-disable no-console */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.log(err.stack);
    return;
  }
  console.log(`connected as ${connection.threadId}`);
});

const DB = 'fRiend';
const createDBQuery = `
  CREATE DATABASE IF NOT EXISTS ${DB};
  USE ${DB};
  CREATE TABLE IF NOT EXISTS properties(
    property_id INTEGER,
    property_zip_code SMALLINT,
    redfin_cost_estimate INTEGER,
    property_tax_rate DECIMAL(5,3),
    insurance_rate DECIMAL(5,3)
  );
  CREATE TABLE IF NOT EXISTS rates(
    rate_id INTEGER,
    lending_zip_code SMALLINT,
    apr DECIMAL(5,3),
    fee_rate DECIMAL(5,3),
    years TINYINT,
    type VARCHAR(5),
    lender VARCHAR(50),
    cost_low INTEGER,
    cost_high INTEGER,
    origination_year YEAR
  );
`;

connection.query(createDBQuery, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`connected to mysql db '${DB}'`);
});

module.exports = connection;
