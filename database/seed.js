/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const faker = require('faker/locale/en_US');
const auth = require('./auth');

async function addTables(credentials) {
  const {
    database, user, password, host,
  } = credentials;

  const conn = await mysql.createConnection({
    host,
    user,
    password,
    database,
    multipleStatements: true,
  });

  const schemaFile = path.resolve(__dirname, 'schema.sql');
  const createDBQuery = fs.readFileSync(schemaFile).toString();

  await conn.query(createDBQuery);

  console.log('successfully created tables');
  conn.close();
}

addTables(auth)
  .catch((err) => {
    console.log(err);
  });


// generate 100 properties
//   property_id - 1-100
//   property_zip_code - limit to 10 total
//   redfin_cost_estimate - 600 - 2500k
//   property_tax_rate - 0.8 - 1.2%
//   insurance_rate - .1 - .3%

// generate 3 lenders
// lender_nmls - random 6 digit number
// TODO - use API to programmatically retrieve list of urls
const lenderLogoUrls = [
  'https://hrsf-fec-cho-lenderlogos.s3-us-west-1.amazonaws.com/10271_logo.gif',
  'https://hrsf-fec-cho-lenderlogos.s3-us-west-1.amazonaws.com/10612_logo.gif',
  'https://hrsf-fec-cho-lenderlogos.s3-us-west-1.amazonaws.com/7834_logo.gif',
];

// generate  rates
//   lending_zip_code - pick zips randomly from property zips, even distribution
//   apr - 4-6%
//   years - 3(a), 5(a), 7(a), 10(a), 10(f), 15(f), 20(f), 30(f)
//   loan_type - ARM, FIXED
//   cost_low - based on lowest property cost, 5 ranges total
//   cost_high - based on highest property cost, 5 ranges total
//   down_payment_min - 0, 10, 20%
//   credit_min - 660, 680, 700, 720, 740
//   lender_id - pick randomly from lender ids
//   origination_year - 2019
