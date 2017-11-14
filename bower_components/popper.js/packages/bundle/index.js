const { rollup, watch } = require('rollup');
const rimraf = require('rimraf');
const { argv } = require('yargs');

// Plugins
const babel = require('rollup-plugin-babel');
const babili = require('rollup-plugin-babel-minify');
const watchEnabled = argv.watch;

// Configs
const babelConfig = require('@popperjs/babel-config');
const sourcemap = true;
const external = ['popper.js'];
const globals = { 'popper.js': 'Popper' };

function bundle({ input, file, name, banner, miniBanner }) {
  rimraf.sync('dist');
  const minifyOptions = {
    comments: false,
    banner: miniBanner,
    mangle: { topLevel: true },
  };

  rollup({
    input,
    plugins: [babel(babelConfig.es6)],
    external,
  }).then(bundle => {
    bundle.write({
      format: 'es',
      file: `dist/${file}`,
      sourcemap,
      globals,
      banner,
    });
  });

  rollup({
    input,
    plugins: [babili(minifyOptions), babel(babelConfig.es6)],
    external,
  }).then(bundle => {
    bundle.write({
      format: 'es',
      file: `dist/${file.replace('.js', '.min.js')}`,
      sourcemap,
      globals,
    });
  });

  rollup({
    input,
    plugins: [babel(babelConfig.es5)],
    external,
  }).then(bundle => {
    bundle.write({
      format: 'umd',
      file: `dist/umd/${file}`,
      sourcemap,
      globals,
      name,
      banner,
    });
    bundle.write({
      format: 'es',
      file: `dist/esm/${file}`,
      sourcemap,
      globals,
      banner,
    });
  });

  rollup({
    input,
    plugins: [babili(minifyOptions), babel(babelConfig.es5)],
    external,
  }).then(bundle => {
    bundle.write({
      format: 'umd',
      file: `dist/umd/${file.replace('.js', '.min.js')}`,
      sourcemap,
      globals,
      name,
    });
    bundle.write({
      format: 'es',
      file: `dist/esm/${file.replace('.js', '.min.js')}`,
      sourcemap,
    });
  });
}

function bundleWatch({ input, file, name, banner, miniBanner }) {
  const watcher = watch({
    input,
    plugins: [babel(babelConfig.es5)],
    external,
    output: {
      format: 'umd',
      file: `dist/umd/${file}`,
      sourcemap,
      globals,
      name,
      banner,
    },
  });

  console.log('\x1Bc'); // reset console
  console.log('Rollup is watching for changes...');
  watcher.on('event', event => {
    switch (event.code) {
      case 'START':
        console.info('Rebuilding...');
        break;
      case 'BUNDLE_START':
        console.info('Bundling...');
        break;
      case 'BUNDLE_END':
        console.info('Bundled!');
        break;
      case 'END':
        console.info('Done!');
        break;
      case 'ERROR':
      case 'FATAL':
        console.error('Error!');
      /* eslint-enable no-console */
    }
  });

  process.on('exit', () => {
    watcher.close();
  });
}


module.exports = watchEnabled ? bundleWatch : bundle;
