test('there is no A in Orzu', () => {
  expect('Orzu').not.toMatch(/A/);
});

test('There is "Ali" in "UmarAli"', () => {
  expect('UmarAli').toMatch(/Ali/);
});
