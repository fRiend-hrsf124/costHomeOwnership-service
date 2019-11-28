/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const db = require('./index.js');

const schemaFile = path.resolve(__dirname, 'schema.sql');
const createDBQuery = fs.readFileSync(schemaFile).toString();
db
  .query(createDBQuery)
  .then(() => {
    console.log('successfully created tables');
    db.close();
  })
  .catch((err) => {
    console.log(err);
  });
