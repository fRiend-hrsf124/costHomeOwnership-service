/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const controller = require('./controller');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/api/costHomeOwnership/properties', async (req, res) => {
  const { id } = req.body;

  try {
    const [properties] = await controller.getPropertyData(id);
    res.json(properties[0]);
  } catch (err) {
    console.log(err);
    res.status(400).end('server could not retrieve property data');
  }
});

app.get('/api/costHomeOwnership/rates', async (req, res) => {
  const {
    cost, zip, term, type, downPay, credit, origYear,
  } = req.body;

  try {
    const [rates] = await controller.getRates(
      cost, zip, term, type, downPay, credit, origYear,
    );
    res.json(rates);
  } catch (err) {
    console.log(err);
    res.status(400).end('server could not retrieve rates data');
  }
});

module.exports = app;
