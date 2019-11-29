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
  return conn;
}

// generate 100 properties
async function seedProperties(conn) {
  const zips = [];
  const zipsCount = 10;
  // TODO - remove longer length zips
  for (let i = 0; i < zipsCount; i += 1) {
    zips.push(faker.address.zipCode());
  }

  const costLow = 600000;
  const costRange = 2000000;

  const taxLow = 0.8;
  const taxRange = 0.4;

  const insuranceLow = 0.1;
  const insuranceRange = 0.2;

  for (let i = 1; i <= 100; i += 1) {
    // TODO - use faker for integer generation instead of math.rand
    const zip = zips[Math.random() * zipsCount];
    const cost = costLow + Math.random() * costRange;
    const taxRate = taxLow + Math.random() * taxRange;
    const insuranceRate = insuranceLow + Math.random() * insuranceRange;
    const query = `INSERT INTO properties (
      property_id,
      property_zip_code,
      redfin_cost_estimate,
      property_tax_rate,
      insurance_rate
      ) VALUES (
      ${i},
      ${zip},
      ${cost},
      ${taxRate},
      ${insuranceRate}
    )`;
    await conn.query(query);
  }

  console.log('successfully seeded property table');
  return conn;
}

addTables(auth)
  .then((conn) => seedProperties(conn))
  .then((conn) => conn.close())
  .catch(console.log);

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
