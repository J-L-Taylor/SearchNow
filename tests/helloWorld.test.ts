const helloWorld = require('../src/helloWorld');

test('helloWorld function should return "Hello, World!"', () => {
  expect(helloWorld()).toBe('Hello, World!');
});