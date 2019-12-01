/* eslint-disable no-console */
const app = require('./app');

const port = 3001;
app.listen(port, () => console.log(`server listening on port ${port}`));
