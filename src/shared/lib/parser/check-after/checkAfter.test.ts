import { ParserStates, ParserSymbols } from '../consts';
import { tag } from '../tag/tag';
import { take } from '../take/take';
import { checkAfter } from './checkAfter';

describe('checkAfter', () => {
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
    const parserTest = checkAfter(tag('A'), tag('FFF'));
    const parser = parserTest('AFFF');

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

    positiveCheck({ type: 'CHECK_NEXT', value: { type: 'TAG', value: 'A' } });
  });

  test('Works (1)', () => {
    const parserTest = checkAfter(tag('B'), tag('%'));
    const parser = parserTest('B%');

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

    positiveCheck({ type: 'CHECK_NEXT', value: { type: 'TAG', value: 'B' } });
  });

  test('Works (2)', () => {
    const parserTest = checkAfter(tag('B'), ParserSymbols.STRING_END);
    const parser = parserTest('B');

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

    positiveCheck({ type: 'CHECK_NEXT', value: { type: 'TAG', value: 'B' } });
  });

  test('Works (3)', () => {
    const parserTest = checkAfter(take(/\d/), tag('.'));
    const parser = parserTest('123456789.');

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

    positiveCheck({ type: 'CHECK_NEXT', value: { type: 'TAKE', value: '123456789' } });
  });

  test('Works (4)', () => {
    const parserTest = checkAfter(take(/\d/), tag([/[^.]/]));
    const parser = parserTest('123456789<');

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

    positiveCheck({ type: 'CHECK_NEXT', value: { type: 'TAKE', value: '123456789' } });
  });

  test('Works stream', () => {
    const parserTest = checkAfter(tag('B'), tag(['%', /\d/]));
    const parser = parserTest('B');

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
      .next('%')
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
      .next('1')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck({ type: 'CHECK_NEXT', value: { type: 'TAG', value: 'B' } });
  });

  test('Error', () => {
    const parserTest = checkAfter(tag('A'), tag('FFF'));
    const parser = parserTest('AF-FF');

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

  test('Error (1)', () => {
    const parserTest = checkAfter(tag('B'), tag('%'));
    const parser = parserTest('B,');

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

  test('Error (2)', () => {
    const parserTest = checkAfter(tag('B'), ParserSymbols.STRING_END);
    const parser = parserTest('B=');

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

  test('Error (3)', () => {
    const parserTest = checkAfter(take(/\d/), tag('.'));
    const parser = parserTest('123456789G');

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

  test('Works (4)', () => {
    const parserTest = checkAfter(take(/\d/), tag([/[^.]/]));
    const parser = parserTest('123456789.');

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

  test('Error stream', () => {
    const parserTest = checkAfter(tag('B'), tag(['%', /\d/, /\d/]));
    const parser = parserTest('B');

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
      .next('%')
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
      .next('1')
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
      .next('B')
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
