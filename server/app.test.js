process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./app');
const { dbConn, createDbTables, cleanDbTables } = require('../database/index');

const zip = 12345;

beforeAll(async () => {
  await createDbTables(dbConn);
  // add zip entry
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

beforeEach(async () => {
});

afterEach(async () => {
});

afterAll(async () => {
  await cleanDbTables(dbConn);
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
    test('It should respond with an array containing a property object with propertyId matching request', async () => {
      const body = { id: 1 };
      const res = await request(app)
        .get('/api/costHomeOwnership/properties')
        .send(body);
      expect(res.statusCode).toBe(200);
      expect(res.body[0].propertyId).toBe(1);
    });

    test('It should respond with 400 for invalid request', async () => {
      const body = {};
      const res = await request(app)
        .get('/api/costHomeOwnership/properties')
        .send(body);
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /api/costHomeOwnership/rates', () => {
    test('It should respond with an array of rate objects matching provided criteria', async () => {
      const criteria = {
        cost: 2180000,
        zip,
        term: 30,
        type: 'Fixed',
        downPay: 20,
        credit: 740,
        origYear: 2019,
      };
      const res = await request(app)
        .get('/api/costHomeOwnership/rates')
        .send(criteria);
      expect(res.statusCode).toBe(200);
      expect(res.body[0].rateId).toBe(1);
    });

    test('It should respond with an empty array if no rates match criteria', async () => {
      const criteria = {
        cost: 80000,
        zip,
        term: 30,
        type: 'Fixed',
        downPay: 20,
        credit: 740,
        origYear: 2019,
      };
      const res = await request(app)
        .get('/api/costHomeOwnership/rates')
        .send(criteria);
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });

    test('It should respond with 400 for invalid request', async () => {
      const body = {};
      const res = await request(app)
        .get('/api/costHomeOwnership/rates')
        .send(body);
      expect(res.statusCode).toBe(400);
    });
  });
});
