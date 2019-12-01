/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('', () => {

});

module.exports = app;
