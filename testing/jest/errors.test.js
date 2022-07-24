function multiplyBy2(num) {
  if (typeof num !== 'number') {
    throw new Error('Type error: not a number');
  }
  return num * 2;
}

test('fail on wrong input', () => {
  expect(() => multiplyBy2('G')).toThrow();
  expect(() => multiplyBy2('G')).toThrow(Error);
  expect(() => multiplyBy2('G')).toThrow('Type error: not a number');
  expect(() => multiplyBy2('G')).toThrow(/Type/);
});
