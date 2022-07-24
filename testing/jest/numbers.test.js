test('2 times 2', () => {
  const v = 2 * 2;
  expect(v).toBeGreaterThan(3);
  expect(v).toBeGreaterThanOrEqual(3.5);
  expect(v).toBeLessThan(5);
  expect(v).toBeLessThanOrEqual(4.5);

  expect(v).toBe(4);
  expect(v).toEqual(4);
});

test('floating point numbers', () => {
  const v = 0.1 + 0.4;
  // expect(v).toBe(0.5); This doesn't work because of rounding
  expect(v).toBeCloseTo(0.5); // This one works
});
