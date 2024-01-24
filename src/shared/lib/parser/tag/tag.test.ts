import { ParserStates, TokenTypes } from '../consts';
import { tag } from './tag';

describe('tag', () => {
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
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes });
    const parser = xmlTag('<div>');

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

    positiveCheck({ type: 'XML' as TokenTypes, value: '<div>' });
  });

  test('Works (1)', () => {
    const xmlTag = tag(['[', /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, ']'], { token: 'XML' as TokenTypes });
    const parser = xmlTag('[span]');

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

    positiveCheck({ type: 'XML' as TokenTypes, value: '[span]' });
  });

  test('Works stream', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes });
    const parser = xmlTag('<div');

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
  });

  test('Works stream (1)', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes });
    const parser = xmlTag('<');

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
      .next('div')
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
      .next('>')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck({ type: 'XML' as TokenTypes, value: '<div>' });
  });

  test('Error', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes });
    const parser = xmlTag('<ХТМЛ>');

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
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes, isExpectNew: false });
    const parser = xmlTag('<div');

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

  test('Stream error', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes });
    const parser = xmlTag('<d');

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
      .next('iv')
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
      .next('<<<<boom!')
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

  test('Stream error (1)', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes });
    const parser = xmlTag('<');

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
      .next('iv')
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
      .next('<<<<boom!')
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
