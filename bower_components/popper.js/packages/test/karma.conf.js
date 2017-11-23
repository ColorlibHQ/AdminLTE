const { argv } = require('yargs');
const path = require('path');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');

const browsers = (argv.browsers ||
  process.env.BROWSERS ||
  'ChromeHeadless'
).split(',');
const singleRun = process.env.NODE_ENV === 'development' ? false : true;
const coverage = process.env.COVERAGE === 'true';
const basePath = process.cwd();

const babelrc = {
  babelrc: false,
  presets: [
    [require.resolve('babel-preset-env'), { modules: false }],
    require.resolve('babel-preset-stage-2'),
  ],
  plugins: [
    require.resolve('babel-plugin-external-helpers'),
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          src: './src',
          'popper.js': '../popper/src/index.js',
        },
      },
    ],
  ],
};

if (coverage) {
  babelrc.plugins.unshift(require.resolve('babel-plugin-istanbul'));
}

module.exports = function(config) {
  const configuration = {
    basePath,
    frameworks: ['jasmine', 'chai', 'sinon'],
    singleRun,
    browserNoActivityTimeout: 60000,
    browserDisconnectTolerance: 10,
    browsers: browsers,
    autoWatch: true,
    concurrency: 2,
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true,
    },
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
          '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          ' --remote-debugging-port=9222',
        ],
      },
      ChromeDebug: {
        base: 'Chrome',
        chromeDataDir: path.resolve(__dirname, '.chrome'),
      },
      SLChrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'macOS 10.12',
      },
      SLFirefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'macOS 10.12',
      },
      SLEdge: {
        base: 'SauceLabs',
        browserName: 'microsoftedge',
      },
      SLSafari: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'macOS 10.12',
      },
      SLInternetExplorer10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '10',
        platform: 'Windows 8',
      },
      SLInternetExplorer11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '11',
        platform: 'Windows 10',
      },
      // Currently not used because the iOS emulator isn't reliable and
      // most of the times it times out
      SLiOS11: {
        base: 'SauceLabs',
        browserName: 'Safari',
        deviceName: 'iPhone 8 Plus Simulator',
        deviceOrientation: 'portrait',
        platformVersion: '11.0',
        platformName: 'iOS',
        appiumVersion: '1.7.1',
      },
      SLChromeMobile: {
        base: 'SauceLabs',
        browserName: 'Chrome',
        appiumVersion: '1.6.3',
        platformVersion: '7.0',
        platformName: 'Android',
        deviceName: 'Android GoogleAPI Emulator',
      },
    },
    preprocessors: {
      ['./node_modules/test-utils/setup.js']: ['rollup'],
      ['./node_modules/test-utils/utils/*.js']: ['rollup'],
      ['./tests/**/*.js']: ['rollup'],
    },

    rollupPreprocessor: {
      format: 'umd',
      sourcemap: 'inline',
      globals: {
        chai: 'chai',
        'popper-utils': 'PopperUtils',
      },
      external: ['chai', 'popper-utils'],
      plugins: [resolve(), babel(babelrc)],
    },
    files: [
      './tests/styles/*.css',
      './tests/functional/*.js',
      './tests/unit/*.js',
    ],
    sauceLabs: {
      testName: 'Popper.js',
      startConnect: false,
      recordVideo: true,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
    },
    reporters: ['mocha', 'saucelabs'],
    plugins: [
      require('karma-chai'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-firefox-launcher'),
      require('karma-jasmine'),
      require('karma-mocha-reporter'),
      require('karma-rollup-preprocessor'),
      require('karma-safari-launcher'),
      require('karma-sauce-launcher'),
      require('karma-sinon'),
    ],
  };

  if (coverage) {
    configuration.coverageReporter = {
      dir: './.tmp/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
      ],
    };
    configuration.reporters.push('coverage');
  }

  config.set(configuration);
};
