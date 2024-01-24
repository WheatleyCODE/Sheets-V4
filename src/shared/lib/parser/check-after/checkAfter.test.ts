import { ParserStates, ParserSymbols } from '../consts';
import { tag } from '../tag/tag';
import { take } from '../take/take';
import { checkAfter } from './checkAfter';

describe('checkAfter', () => {
  test('Works', () => {
    const parserTest = checkAfter(tag('A'), tag('FFF'));

    const parser = parserTest('AFFF');

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

    expect(res).toEqual({ type: 'CHECK_NEXT', value: { type: 'TAG', value: 'A' } });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works (1)', () => {
    const parserTest = checkAfter(tag('B'), tag('%'));

    const parser = parserTest('B%');

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

    expect(res).toEqual({ type: 'CHECK_NEXT', value: { type: 'TAG', value: 'B' } });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works (2)', () => {
    const parserTest = checkAfter(tag('B'), ParserSymbols.STRING_END);

    const parser = parserTest('B');

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

    expect(res).toEqual({ type: 'CHECK_NEXT', value: { type: 'TAG', value: 'B' } });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works (3)', () => {
    const parserTest = checkAfter(take(/\d/), tag('.'));

    const parser = parserTest('123456789.');

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

    expect(res).toEqual({ type: 'CHECK_NEXT', value: { type: 'TAKE', value: '123456789' } });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works (4)', () => {
    const parserTest = checkAfter(take(/\d/), tag([/[^.]/]));

    const parser = parserTest('123456789<');

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

    expect(res).toEqual({ type: 'CHECK_NEXT', value: { type: 'TAKE', value: '123456789' } });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works stream', () => {
    const parserTest = checkAfter(tag('B'), tag(['%', /\d/]));

    const parser = parserTest('B');

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
      .next('%')
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
      .next('1')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    expect(res).toEqual({ type: 'CHECK_NEXT', value: { type: 'TAG', value: 'B' } });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Error', () => {
    const parserTest = checkAfter(tag('A'), tag('FFF'));

    const parser = parserTest('AF-FF');

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

    expect(res).toBe(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });

  test('Error (1)', () => {
    const parserTest = checkAfter(tag('B'), tag('%'));

    const parser = parserTest('B,');

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

    expect(res).toBe(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });

  test('Error (2)', () => {
    const parserTest = checkAfter(tag('B'), ParserSymbols.STRING_END);

    const parser = parserTest('B=');

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

    expect(res).toBe(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });

  test('Error (3)', () => {
    const parserTest = checkAfter(take(/\d/), tag('.'));

    const parser = parserTest('123456789G');

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

    expect(res).toBe(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });

  test('Works (4)', () => {
    const parserTest = checkAfter(take(/\d/), tag([/[^.]/]));

    const parser = parserTest('123456789.');

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

    expect(res).toBe(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });

  test('Error stream', () => {
    const parserTest = checkAfter(tag('B'), tag(['%', /\d/, /\d/]));

    const parser = parserTest('B');

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
      .next('%')
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
      .next('1')
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
      .next('B')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    expect(res).toBe(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });
});
