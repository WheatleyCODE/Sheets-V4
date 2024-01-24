import { SyncPromise } from '../../promise';
import { ParserStates, TokenTypes } from '../consts';
import { take } from './take';

describe('take', () => {
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

  test('Works', () => {
    const numParser = take(/\d/, { token: 'NUMBER' as TokenTypes });
    const parser = numParser('123456789d');

    parser
      .next()
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck({ type: 'NUMBER' as TokenTypes, value: '123456789' });
  });

  test('Works (1)', () => {
    const numParser = take(/\d/, { token: 'NUMBER' as TokenTypes, isExpectNew: false });
    const parser = numParser('123456789');

    parser
      .next()
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck({ type: 'NUMBER' as TokenTypes, value: '123456789' });
  });

  test('Works (3)', () => {
    const numParser = take(/\d/, { token: 'NUMBER' as TokenTypes });
    const parser = numParser('123456789');

    SyncPromise.all([...parser])
      .then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck(['EXPECT_NEW_INPUT', { type: 'NUMBER', value: '123456789' }]);
  });

  test('Works (4)', () => {
    const numParser = take(/\d/, { min: 4, max: 5, token: 'NUMBER' as TokenTypes });
    const parser = numParser('123456789');

    SyncPromise.all([...parser])
      .then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck([{ type: 'NUMBER', value: '12345' }]);
  });

  test('Works (5)', () => {
    const numParser = take(/\d/, { token: 'NUMBER' as TokenTypes, isExpectNew: false });
    const parser = numParser('123456789');

    SyncPromise.all([...parser])
      .then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck([{ type: 'NUMBER', value: '123456789' }]);
  });

  test('Works stream', () => {
    const numParser = take(/\d/, { token: 'NUMBER' as TokenTypes });
    const parser = numParser('1');

    parser
      .next()
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
    clearVars();

    parser
      .next('234')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
    clearVars();

    parser
      .next('56@')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck({ type: 'NUMBER' as TokenTypes, value: '123456' });
  });

  test('Works min', () => {
    const numParser = take(/\d/, { min: 2, token: 'NUMBER' as TokenTypes });
    const parser = numParser('123456789d');

    parser
      .next()
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck({ type: 'NUMBER' as TokenTypes, value: '123456789' });
  });

  test('Works min, max', () => {
    const numParser = take(/\d/, { min: 2, max: 4, token: 'NUMBER' as TokenTypes });
    const parser = numParser('123456789d');

    parser
      .next()
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck({ type: 'NUMBER' as TokenTypes, value: '1234' });
  });

  test('Works min, max (2)', () => {
    const numParser = take(/\d/, { min: 2, max: 4, token: 'NUMBER' as TokenTypes });
    const parser = numParser('123d');

    parser
      .next()
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck({ type: 'NUMBER' as TokenTypes, value: '123' });
  });

  test('Error data', () => {
    const numParser = take(/\d/, { token: 'NUMBER' as TokenTypes });
    const parser = numParser('dbdfd');

    parser
      .next()
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    negativeCheck();
  });

  test('Error min', () => {
    const numParser = take(/\d/, { min: 2, token: 'NUMBER' as TokenTypes });
    const parser = numParser('1b');

    parser
      .next()
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    negativeCheck();
  });

  test('Error min, max', () => {
    const numParser = take(/\d/, { min: 3, max: 4, token: 'NUMBER' as TokenTypes });
    const parser = numParser('12d');

    parser
      .next()
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    negativeCheck();
  });

  test('Error min, max (1)', () => {
    const numParser = take(/\d/, { min: 4, max: 5, token: 'NUMBER' as TokenTypes });
    const parser = numParser('123');

    SyncPromise.all([...parser])
      .then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    negativeCheck();
  });

  test('Error min, max, stream', () => {
    const numParser = take(/\d/, { min: 3, max: 4, token: 'NUMBER' as TokenTypes });
    const parser = numParser('1');

    parser
      .next()
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
    clearVars();

    parser
      .next('2')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
    clearVars();

    parser
      .next('@')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    negativeCheck();
  });
});
