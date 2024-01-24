import { SyncPromise } from '../../../promise';
import { number } from './number';

describe('number', () => {
  let res: any;
  let error: any;
  let thenCalls = 0;
  let catchCalls = 0;

  const clearVars = () => {
    res = undefined;
    error = undefined;
    thenCalls = 0;
    catchCalls = 0;
  };

  beforeEach(clearVars);

  const positiveCheck = (obj: any) => {
    res = res.at(-1);

    expect(res).toEqual(obj);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  };

  const negativeCheck = () => {
    expect(res).toBe(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  };

  describe('Zeros', () => {
    test('Work zero', () => {
      const parser = number('0');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      positiveCheck({ type: 'NUMBER', value: [{ type: 'NUMBER_INT', value: '0' }] });
    });

    test('Work zero (1)', () => {
      const parser = number('-0');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      positiveCheck({
        type: 'NUMBER',
        value: [
          { type: 'NUMBER_SIGN', value: '-' },
          { type: 'NUMBER_INT', value: '0' },
        ],
      });
    });

    test('Work zero (2)', () => {
      const parser = number('+0');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      positiveCheck({
        type: 'NUMBER',
        value: [
          { type: 'NUMBER_SIGN', value: '+' },
          { type: 'NUMBER_INT', value: '0' },
        ],
      });
    });

    test('Work zero (3)', () => {
      const parser = number('0.0');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      positiveCheck({
        type: 'NUMBER',
        value: [
          { type: 'NUMBER_INT', value: '0' },
          { type: 'NUMBER_FRACTION', value: '0' },
        ],
      });
    });
  });

  describe('Numbers', () => {
    test('Work number', () => {
      const parser = number('1020304050');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      positiveCheck({ type: 'NUMBER', value: [{ type: 'NUMBER_INT', value: '1020304050' }] });
    });

    test('Work number negative', () => {
      const parser = number('-1020304050');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      positiveCheck({
        type: 'NUMBER',
        value: [
          { type: 'NUMBER_SIGN', value: '-' },
          { type: 'NUMBER_INT', value: '1020304050' },
        ],
      });
    });

    test('Work number exponent', () => {
      const parser = number('1020.10e120');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      positiveCheck({
        type: 'NUMBER',
        value: [
          { type: 'NUMBER_INT', value: '1020' },
          { type: 'NUMBER_FRACTION', value: '10' },
          {
            type: 'NUMBER_EXPONENT',
            value: [
              {
                type: 'EXPONENT',
                value: [
                  { type: 'EXPONENT_SYMBOL', value: 'e' },
                  { type: 'EXPONENT_INT', value: '120' },
                ],
              },
            ],
          },
        ],
      });
    });

    test('Work number exponent negative', () => {
      const parser = number('1020.10e-120');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      positiveCheck({
        type: 'NUMBER',
        value: [
          { type: 'NUMBER_INT', value: '1020' },
          { type: 'NUMBER_FRACTION', value: '10' },
          {
            type: 'NUMBER_EXPONENT',
            value: [
              {
                type: 'EXPONENT',
                value: [
                  { type: 'EXPONENT_SYMBOL', value: 'e' },
                  { type: 'EXPONENT_SIGN', value: '-' },
                  { type: 'EXPONENT_INT', value: '120' },
                ],
              },
            ],
          },
        ],
      });
    });
  });
});
