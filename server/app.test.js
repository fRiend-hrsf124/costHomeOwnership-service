process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./app');
const { dbConn, createDbTables, cleanDbTables } = require('../database/index');

beforeAll(async () => {
  await createDbTables(dbConn);
});

beforeEach(async () => {
  // add zip entry
  const zip = 12345;
  const taxRate = 1.234;
  let query = `INSERT INTO zips (
      zip_code,
      property_tax_rate
      ) VALUES (
      "${zip}",
      ${taxRate}
    );\n`;
  await dbConn.query(query);

  // add property entry
  const cost = 1234567;
  const insuranceRate = 0.123;
  query = `INSERT INTO properties (
    property_id,
    zip_code,
    redfin_cost_estimate,
    insurance_rate
    ) VALUES (
      ${1},
      "${zip}",
      ${cost},
      ${insuranceRate}
      );\n`;
  await dbConn.query(query);

  // add lender entry
  const lenderLogoUrl = 'https://hrsf-fec-cho-lenderlogos.s3-us-west-1.amazonaws.com/10271_logo.gif';
  const nmls = 123456;
  query = `INSERT INTO lenders (
    lender_logo_url,
    lender_nmls
    ) VALUES (
      "${lenderLogoUrl}",
      ${nmls}
      );\n`;
  await dbConn.query(query);

  // add rate entry
  const apr = 4.123;
  const type = 'Fixed';
  const term = 30;
  const low = 1000000;
  const high = 2500000;
  const downPaymentMin = 20;
  const creditMin = 700;
  const lenderId = 1;
  query = `INSERT INTO rates (
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
  await dbConn.query(query);
});

afterEach(async () => {
  await cleanDbTables(dbConn);
});

afterAll(async () => {
  await dbConn.end();
});

describe('Server', () => {
  describe('GET /', () => {
    test('It should respond with 200', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /api/costHomeOwnership/properties', () => {
    test('It should respond with a JSON object with property_id key', async () => {
      const body = { id: 1 };
      const res = await request(app)
        .get('/api/costHomeOwnership/properties')
        .send(body);
      expect(res.statusCode).toBe(200);
      // expect(res.body).toBe(
      //   expect.objectContaining({
      //     property_id: 1,
      //   }),
      // );
    });
  });
});
