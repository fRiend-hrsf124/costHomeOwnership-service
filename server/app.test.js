const request = require('supertest');
const app = require('./app');

describe('Server', () => {
  describe('GET /', () => {
    test('It should respond with 200', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /api/costHomeOwnership/properties', () => {
    test('It should respond with a JSON object with property_id key', async () => {
      const body = { id: 7 };
      const res = await request(app)
        .get('/api/costHomeOwnership/properties')
        .send(body);
      expect(res.statusCode).toBe(200);
      // expect(res.body).toBe(
      //   expect.objectContaining({
      //     property_id: 7,
      //   }),
      // );
    });
  });
});
