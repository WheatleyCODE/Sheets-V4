/* eslint-disable @typescript-eslint/no-unused-vars */
import { sleep } from '../../promises';
import { intoAsyncIter } from './asyncIter';

const POTENTIAL_ACCELERATION_MS = 10;

describe('intoAsyncIter', () => {
  test('Delay works', async () => {
    const iter = intoAsyncIter<Promise<void>>([sleep(100), sleep(150), sleep(200)]).enumerate();

    const start = Date.now();
    const time: Record<string, number> = {};
    let calls = 0;

    for await (const [_, index] of iter) {
      calls += 1;
      time[String(index)] = Date.now() - start;
    }

    expect(calls).toBe(3);
    expect(Date.now() - start).toBeGreaterThan(200);

    expect(time['0']).toBeGreaterThan(100 - POTENTIAL_ACCELERATION_MS);
    expect(time['1']).toBeGreaterThan(150 - POTENTIAL_ACCELERATION_MS);
    expect(time['2']).toBeGreaterThan(200 - POTENTIAL_ACCELERATION_MS);
  });

  test('Delay + methods works', async () => {
    let forEachCalls = 0;

    const iter = intoAsyncIter<Promise<void>>([sleep(100), sleep(150), sleep(200), sleep(250)])
      .map(() => 'undefined')
      .enumerate()
      .filter(([_, i]) => i > 1)
      .forEach(() => (forEachCalls += 1));

    const start = Date.now();
    const time: Record<string, number> = {};
    let calls = 0;

    for await (const [_, index] of iter) {
      calls += 1;
      time[String(index)] = Date.now() - start;
    }

    expect(calls).toBe(2);
    expect(forEachCalls).toBe(2);
    expect(Date.now() - start).toBeGreaterThan(200 - POTENTIAL_ACCELERATION_MS);
    expect(time['2']).toBeGreaterThan(200 - POTENTIAL_ACCELERATION_MS);
    expect(time['3']).toBeGreaterThan(250 - POTENTIAL_ACCELERATION_MS);
  });
});
