/* eslint-disable no-console */
const controller = require('./controller');
const app = require('./app');

(async () => {
  if (process.env.NODE_ENV === 'prod') {
    try {
      await controller.updateClientBundle();
    } catch (error) {
      console.log(error);
    }
  }

  const port = 3001;
  app.listen(port, () => console.log(`server listening on port ${port}`));
})();
