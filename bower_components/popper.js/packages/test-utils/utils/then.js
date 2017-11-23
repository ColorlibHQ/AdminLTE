export default function then(callback, delay = 100) {
  setTimeout(callback, jasmine.THEN_DELAY);
  jasmine.THEN_DELAY += delay;
}

beforeEach(() => (jasmine.THEN_DELAY = 0));
