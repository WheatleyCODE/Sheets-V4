import { callOnFulfilled } from './callOnFulfilled';

describe('callOnFulfilled', () => {
  test('Fulfilled', () => {
    const callback = jest.fn();

    callOnFulfilled({ type: 'fulfilled' }, callback);

    expect(callback.mock.calls).toHaveLength(1);
  });

  test('Rejected', () => {
    const callback = jest.fn();

    callOnFulfilled({ type: 'rejected' }, callback);

    expect(callback.mock.calls).toHaveLength(0);
  });

  test('Random string', () => {
    const callback = jest.fn();

    callOnFulfilled({ type: 'randdom string' }, callback);

    expect(callback.mock.calls).toHaveLength(0);
  });
});
