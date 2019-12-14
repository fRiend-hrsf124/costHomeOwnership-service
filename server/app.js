/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const controller = require('./controller');
const keysToCamel = require('./camelCaseUtil');

const app = express();
app.use(cors());
app.use(compression());

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/api/costHomeOwnership/properties', async (req, res) => {
  // TODO - check security implications
  const { id } = req.query;
  if (id === undefined) {
    res.status(400).end('missing query parameters');
    return;
  }

  try {
    const [properties] = await controller.getPropertyData(id);
    res.json(keysToCamel(properties));
  } catch (err) {
    res.status(500).end('server could not retrieve property data');
  }
});

app.get('/api/costHomeOwnership/rates', async (req, res) => {
  // TODO - check security implications
  const queries = req.query;
  const params = ['cost', 'zipCode', 'term', 'type', 'downPay', 'credit', 'origYear'];
  for (let i = 0; i < params.length; i += 1) {
    if (queries[params[i]] === undefined) {
      res.status(400).end('missing query parameters');
      return;
    }
  }

  const {
    cost, zipCode, term, type, downPay, credit, origYear,
  } = queries;

  try {
    const [rates] = await controller.getRates(
      cost, zipCode, term, type, downPay, credit, origYear,
    );
    res.json(keysToCamel(rates));
  } catch (err) {
    res.status(500).end('server could not retrieve rates data');
  }
});

module.exports = app;
