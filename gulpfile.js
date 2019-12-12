const path = require('path');
const {
  parallel, series, watch, src, dest,
} = require('gulp');
const run = require('gulp-run');

const build = (cb) => {
  const watcher = watch(path.resolve('.', 'public', 'bundle.js'));
  run('npm run build').exec();
  watcher.on('change', () => {
    cb();
    watcher.close();
  });
};

const deployBundleToS3 = async () => {
  await Promise.resolve('complete');
};

module.exports = {
  default: parallel(
    series(
      build,
      deployBundleToS3,
    ),
  ),
};
