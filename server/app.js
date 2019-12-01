/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const controller = require('./controller');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('', (req, res) => {
  controller.getPropertyData
    .then((data) => {

    })
    .catch(console.log);

});

module.exports = app;
