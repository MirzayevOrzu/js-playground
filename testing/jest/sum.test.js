const sum = require('./sum');

test('sum function to be defined', () => {
  expect(sum).toBeDefined();
});

test('add 2 + 3 equals 5', () => {
  expect(sum(2, 3)).toBe(5);
});

test('add 3 + 4 not equals 8', () => {
  expect(sum(3, 4)).not.toBe(8);
});
