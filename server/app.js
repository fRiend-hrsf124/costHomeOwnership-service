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
    const [rows] = await controller.getPropertyData(id);
    res.end(JSON.stringify(rows[0]));
  } catch (err) {
    console.log(err);
    res.status(400).end('server could not retrieve property data');
  }
});

app.get('/api/costHomeOwnership/rates', (req, res) => {
  const { cost, zip } = req.body;
});

module.exports = app;
