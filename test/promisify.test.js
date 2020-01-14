const PromisifyAsync = require('../promisify-async');

const promisifyAsync = new PromisifyAsync();

test('promise resolves', async () => {
  const cId = 123;
  const expectedResult = 'The expected result';
  const thePromise = promisifyAsync.createPromise(cId);
  promisifyAsync.resolveForCorrelationId(cId, expectedResult);
  const result = await thePromise;
  expect(result).toBe(expectedResult);
});