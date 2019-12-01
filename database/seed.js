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
  // weighted toward more popular options
  const terms = [3, 5, 7, 10, 10, 15, 15, 20, 30, 30, 30, 30];
  const types = ['ARM', 'Fixed', 'Fixed'];

  const rateCount = 1000;
  let query = '';
  for (let i = 0; i < rateCount; i += 1) {
    const zip = zips[faker.random.number(zips.length - 1)];
    const apr = faker.random.number({ min: 4, max: 5.25, precision: 0.001 });
    const type = types[faker.random.number(types.length - 1)];
    const term = terms[faker.random.number(type === 'Fixed'
      ? { min: 4, max: terms.length - 1 }
      : 3)];
    const low = faker.random.number({ min: 0, max: 2000000, precision: 100000 });
    const high = faker.random.number({ min: 1000000, max: 3500000, precision: 100000 });
    const downPaymentMin = faker.random.number({ min: 0, max: 20, precision: 10 });
    const creditMin = faker.random.number({ min: 660, max: 740, precision: 20 });
    const lenderId = faker.random.number({ min: 1, max: 3 });

    const partialQuery = `INSERT INTO rates (
      zip_code,
      apr,
      term,
      loan_type,
      cost_low,
      cost_high,
      down_payment_min,
      credit_min,
      lender_id,
      origination_year
    ) VALUES (
      "${zip}",
      ${apr},
      ${term},
      "${type}",
      ${low},
      ${high},
      ${downPaymentMin},
      ${creditMin},
      ${lenderId},
      2019
    );\n`;
    query += partialQuery;
  }

  return conn.query(query);
};

(async (scopeAuth) => {
  let sharedZips = new Set();
  while (sharedZips.size < 10) {
    const zip = faker.address.zipCode();
    if (zip.length === 5) {
      sharedZips.add(zip);
    }
  }
  sharedZips = [...sharedZips];

  const conn = await createDbConn(scopeAuth);
  await createDbTables(conn);
  console.log('created database tables');
  await seedZips(conn, sharedZips);
  console.log('seeded zips table');
  await seedProperties(conn, sharedZips);
  console.log('seeded properties table');
  await seedLenders(conn);
  console.log('seeded lenders table');
  await seedRates(conn, sharedZips);
  console.log('seeded rates table');
  conn.close();
})(auth).catch(console.log);
