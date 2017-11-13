import simulateScroll from './utils/simulateScroll';

const wrapper = document.createElement('div');
wrapper.id = 'jasmineWrapper';
document.body.appendChild(wrapper);

beforeEach(function() {
  jasmine.addMatchers({
    toBeApprox: function() {
      return {
        compare: function(actual, expected, within) {
          within = within || 1.5;
          return {
            pass: actual >= expected - within && actual <= expected + within,
          };
        },
      };
    },
  });

  const reporterCurrentSpec = {
    specStarted: function(result) {
      window.testName = result.fullName;
    },
  };
  jasmine.getEnv().addReporter(reporterCurrentSpec);

  const jasmineWrapper = document.getElementById('jasmineWrapper');
  jasmineWrapper.innerHTML = '';
  simulateScroll(document.body, 0);
});
