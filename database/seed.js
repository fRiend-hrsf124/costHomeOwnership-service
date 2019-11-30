/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const faker = require('faker/locale/en_US');
const auth = require('./auth');

const dbConn = (async function seed(credentials) {
  const {
    database, user, password, host,
  } = credentials;

  // eslint-disable-next-line no-return-await
  return mysql.createConnection({
    host,
    user,
    password,
    database,
    multipleStatements: true,
  });
}(auth));

async function addTables(conn) {
  const schemaFile = path.resolve(__dirname, 'schema.sql');
  const createDBQuery = fs.readFileSync(schemaFile).toString();

  await conn.query(createDBQuery);

  console.log('successfully created tables');
}

// generate 10 zip codes
const zips = [];
const zipsCount = 10;
for (let i = 0; i < zipsCount; i += 1) {
  // TODO - use set with while loop to avoid duplicates
  zips.push(faker.address.zipCode());
}

async function seedZips(conn) {
  const taxLow = 0.8;
  const taxRange = 0.4;

  const queries = [];
  for (let i = 0; i < zipsCount; i += 1) {
    const zip = zips[i];
    const taxRate = taxLow + faker.random.number(taxRange * 1000) / 1000;
    const query = `INSERT INTO zips (
      zip_code,
      property_tax_rate
      ) VALUES (
      "${zip}",
      ${taxRate}
    )`;
    queries.push(conn.query(query));
  }
  await Promise.all(queries);
  console.log('successfully seeded zips table');
}

// generate 100 properties
async function seedProperties(conn) {
  const costLow = 600000;
  const costRange = 2000000;

  const insuranceLow = 0.1;
  const insuranceRange = 0.2;

  const queries = [];
  for (let i = 1; i <= 100; i += 1) {
    const zip = zips[faker.random.number(zipsCount - 1)];
    const cost = costLow + faker.random.number(costRange / 10000) * 10000;
    const insuranceRate = insuranceLow + faker.random.number(insuranceRange * 100) / 100;
    const query = `INSERT INTO properties (
      property_id,
      zip_code,
      redfin_cost_estimate,
      insurance_rate
      ) VALUES (
      ${i},
      "${zip}",
      ${cost},
      ${insuranceRate}
    )`;
    queries.push(conn.query(query));
  }

  await Promise.all(queries);
  console.log('successfully seeded property table');
}

addTables(dbConn)
  .then(() => seedZips(dbConn))
  .then(() => seedProperties(dbConn))
  .then(() => dbConn.close())
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
