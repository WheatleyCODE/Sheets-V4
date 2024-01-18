import { ParserStates, TokenTypes } from '../consts';
import { take } from './take';

describe('take', () => {
  test('Works', () => {
    const numParser = take(/\d/, { token: TokenTypes.NUMBER });
    const parser = numParser('123456789d');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

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

    expect(res).toEqual({ type: TokenTypes.NUMBER, value: '123456789' });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works stream', () => {
    const numParser = take(/\d/, { token: TokenTypes.NUMBER });
    const parser = numParser('1');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

    const clearVars = () => {
      res = undefined;
      error = undefined;
      thenCalls = 0;
      catchCalls = 0;
    };

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

    expect(res).toBe(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

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

    expect(res).toBe(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

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

    expect(res).toEqual({ type: TokenTypes.NUMBER, value: '123456' });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works min', () => {
    const numParser = take(/\d/, { min: 2, token: TokenTypes.NUMBER });
    const parser = numParser('123456789d');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

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

    expect(res).toEqual({ type: TokenTypes.NUMBER, value: '123456789' });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works min, max', () => {
    const numParser = take(/\d/, { min: 2, max: 4, token: TokenTypes.NUMBER });
    const parser = numParser('123456789d');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

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

    expect(res).toEqual({ type: TokenTypes.NUMBER, value: '1234' });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works min, max (2)', () => {
    const numParser = take(/\d/, { min: 2, max: 4, token: TokenTypes.NUMBER });
    const parser = numParser('123d');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

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

    expect(res).toEqual({ type: TokenTypes.NUMBER, value: '123' });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Error data', () => {
    const numParser = take(/\d/, { token: TokenTypes.NUMBER });
    const parser = numParser('dbdfd');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

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

    expect(res).toEqual(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });

  test('Error min', () => {
    const numParser = take(/\d/, { min: 2, token: TokenTypes.NUMBER });
    const parser = numParser('1b');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

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

    expect(res).toEqual(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });

  test('Error min, max', () => {
    const numParser = take(/\d/, { min: 3, max: 4, token: TokenTypes.NUMBER });
    const parser = numParser('12d');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

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

    expect(res).toEqual(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });

  test('Error min, max, stream', () => {
    const numParser = take(/\d/, { min: 3, max: 4, token: TokenTypes.NUMBER });
    const parser = numParser('1');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

    const clearVars = () => {
      res = undefined;
      error = undefined;
      thenCalls = 0;
      catchCalls = 0;
    };

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

    expect(res).toBe(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

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

    expect(res).toBe(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

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

    expect(res).toEqual(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });
});
