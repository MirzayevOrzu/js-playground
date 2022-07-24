test('object assigment', () => {
  const data = { name: 'Orzu' };
  data['age'] = 20;
  expect(data).toEqual({ name: 'Orzu', age: 20 });
});
