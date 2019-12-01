/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.listen(port, () => console.log(`server listening on port ${port}`));
