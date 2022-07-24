const skills = ['JavaScript', 'TypeScript', 'Node.js', 'TESTING'];

test('TESTING is within skills', () => {
  expect(skills).toContain('TESTING');
});
