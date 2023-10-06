import { sleep } from './sleep';

const POTENTIAL_ACCELERATION_MS = 10;

describe('sleep', () => {
  test('Delay works', async () => {
    const start = Date.now();

    await sleep(100);

    expect(Date.now() - start).toBeGreaterThan(100 - POTENTIAL_ACCELERATION_MS);
  });
});
