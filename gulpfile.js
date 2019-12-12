/* eslint-disable no-console */
const path = require('path');
const {
  parallel, series, watch, src,
} = require('gulp');
const run = require('gulp-run');
const s3config = require('./database/s3credentials');
// eslint-disable-next-line import/order
const s3 = require('gulp-s3-upload')(s3config);

const bundleFile = path.resolve('.', 'public', 'bundle.js');

const build = (cb) => {
  const watcher = watch(bundleFile);
  run('npm run build').exec();
  watcher.on('change', () => {
    cb();
    watcher.close();
  });
};

const deployBundleToS3 = (cb) => {
  src(bundleFile).pipe(s3({
    Bucket: 'hrsf-fec-nz',
    ACL: 'public-read',
    onChange: (keyname) => {
      console.log(`'${keyname}' has been updated`);
      cb();
    },
    onNoChange: (keyname) => {
      console.log(`'${keyname}' matches existing version, no change`);
      cb();
    },
  }, {
    maxRetries: 3,
  }));
};

module.exports = {
  default: parallel(
    series(
      build,
      deployBundleToS3,
    ),
  ),
};
