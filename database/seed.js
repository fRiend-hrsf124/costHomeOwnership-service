/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const faker = require('faker/locale/en_US');
const auth = require('./auth');

const createDbConn = (scopeAuth) => {
  const {
    database, user, password, host,
  } = scopeAuth;

  return mysql.createConnection({
    host,
    user,
    password,
    database,
    multipleStatements: true,
  });
};

const createDbTables = (conn) => {
  const schemaFile = path.resolve(__dirname, 'schema.sql');
  const createDBQuery = fs.readFileSync(schemaFile).toString();

  return conn.query(createDBQuery);
};

const seedZips = (conn, zips) => {
  const taxLow = 0.8;
  const taxRange = 0.4;

  let query = '';
  for (let i = 0; i < zips.length; i += 1) {
    const zip = zips[i];
    const taxRate = taxLow + faker.random.number(taxRange * 1000) / 1000;
    const partialQuery = `INSERT INTO zips (
      zip_code,
      property_tax_rate
      ) VALUES (
      "${zip}",
      ${taxRate}
    );\n`;
    query += partialQuery;
  }

  return conn.query(query);
};

const seedProperties = (conn, zips) => {
  const costLow = 600000;
  const costRange = 2000000;

  const insuranceLow = 0.1;
  const insuranceRange = 0.2;

  const propertyCount = 100;
  let query = '';
  for (let i = 1; i <= propertyCount; i += 1) {
    const zip = zips[faker.random.number(zips.length - 1)];
    const cost = costLow + faker.random.number(costRange / 10000) * 10000;
    const insuranceRate = insuranceLow + faker.random.number(insuranceRange * 100) / 100;
    const partialQuery = `INSERT INTO properties (
      property_id,
      zip_code,
      redfin_cost_estimate,
      insurance_rate
      ) VALUES (
        ${i},
        "${zip}",
        ${cost},
        ${insuranceRate}
      );\n`;
    query += partialQuery;
  }

  return conn.query(query);
};

const seedLenders = (conn) => {
  // TODO - use S3 API to programmatically retrieve list of urls
  const lenderLogoUrls = [
    'https://hrsf-fec-cho-lenderlogos.s3-us-west-1.amazonaws.com/10271_logo.gif',
    'https://hrsf-fec-cho-lenderlogos.s3-us-west-1.amazonaws.com/10612_logo.gif',
    'https://hrsf-fec-cho-lenderlogos.s3-us-west-1.amazonaws.com/7834_logo.gif',
  ];

  const lenderCount = 3;
  let query = '';
  for (let i = 0; i < lenderCount; i += 1) {
    // lender_nmls - random 6 digit number
    const nmls = faker.random.number({ min: 100000, max: 999999 });
    const partialQuery = `INSERT INTO lenders (
      lender_logo_url,
      lender_nmls
      ) VALUES (
        "${lenderLogoUrls[i]}",
        ${nmls}
      );\n`;
    query += partialQuery;
  }

  return conn.query(query);
};

const seedRates = (conn, zips) => {
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
};

(async (scopeAuth) => {
  // TODO - use JS Set with while loop and length checking to avoid duplicates for
  // larger quantities
  const sharedZips = [];
  const zipsCount = 10;
  for (let i = 0; i < zipsCount; i += 1) {
    sharedZips.push(faker.address.zipCode());
  }

  const conn = await createDbConn(scopeAuth);
  await createDbTables(conn);
  console.log('successfully created tables');
  await seedZips(conn, sharedZips);
  console.log('successfully seeded zips table');
  await seedProperties(conn, sharedZips);
  console.log('successfully seeded properties table');
  await seedLenders(conn);
  console.log('successfully seeded lenders table');
  conn.close();
})(auth).catch(console.log);
