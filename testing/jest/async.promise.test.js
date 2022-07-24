const promise = require('./async');

test('result is "Incredible"', () => {
  return promise.then((val) => {
    expect(val).toBe('Incredible');
  });
});
