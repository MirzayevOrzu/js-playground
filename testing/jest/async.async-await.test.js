const promise = require('./async');

const asyncFn = () => promise;

test('result is "Incredible" 2', async () => {
  const val = await asyncFn();
  expect(val).toBe('Incredible');
});
