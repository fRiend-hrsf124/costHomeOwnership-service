/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const controller = require('./controller');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/api/costHomeOwnership/properties', (req, res) => {
  controller.getPropertyData()
    .then((data) => {

    })
    .catch((err) => {
      console.log(err);
      res.status(400).end(err);
    });
});

app.get('/api/costHomeOwnership/rates', (req, res) => {
  const { cost, zip } = req.body;
  controller.getRates(cost, zip)
    .then((rates) => {

    })
    .catch((err) => {
      console.log(err);
      res.status(400).end(err);
    });
});

module.exports = app;
