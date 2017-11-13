const { rollup } = require('rollup');

// Plugins
const babel = require('rollup-plugin-babel');
const babili = require('rollup-plugin-babel-minify');

// Configs
const babelConfig = require('@popperjs/babel-config');
const sourceMap = true;
const external = ['popper.js'];
const globals = { 'popper.js': 'Popper' };

function bundle({ entry, dest, moduleName, banner, miniBanner }) {
  const minifyOptions = {
    comments: false,
    banner: miniBanner,
    mangle: { topLevel: true },
  };

  rollup({
    entry,
    plugins: [babel(babelConfig.es6)],
    external,
  }).then(bundle => {
    bundle.write({
      format: 'es',
      dest: `dist/${dest}`,
      sourceMap,
      globals,
      banner,
    });
  });

  rollup({
    entry,
    plugins: [babili(minifyOptions), babel(babelConfig.es6)],
    external,
  }).then(bundle => {
    bundle.write({
      format: 'es',
      dest: `dist/${dest.replace('.js', '.min.js')}`,
      sourceMap,
      globals,
    });
  });

  rollup({
    entry,
    plugins: [babel(babelConfig.es5)],
    external,
  }).then(bundle => {
    bundle.write({
      format: 'umd',
      dest: `dist/umd/${dest}`,
      sourceMap,
      globals,
      moduleName,
      banner,
    });
    bundle.write({
      format: 'es',
      dest: `dist/esm/${dest}`,
      sourceMap,
      globals,
      banner,
    });
  });

  rollup({
    entry,
    plugins: [babili(minifyOptions), babel(babelConfig.es5)],
    external,
  }).then(bundle => {
    bundle.write({
      format: 'umd',
      dest: `dist/umd/${dest.replace('.js', '.min.js')}`,
      sourceMap,
      globals,
      moduleName,
    });
    bundle.write({
      format: 'es',
      dest: `dist/esm/${dest.replace('.js', '.min.js')}`,
      sourceMap,
    });
  });
}

module.exports = bundle;
