import { ParserStates, TokenTypes } from '../consts';
import { tag } from './tag';

describe('tag', () => {
  test('Works', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes });

    const parser = xmlTag('<div>');

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

    expect(res).toEqual({ type: 'XML' as TokenTypes, value: '<div>' });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works (1)', () => {
    const xmlTag = tag(['[', /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, ']'], { token: 'XML' as TokenTypes });

    const parser = xmlTag('[span]');

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

    expect(res).toEqual({ type: 'XML' as TokenTypes, value: '[span]' });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works stream', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes });

    const parser = xmlTag('<div');

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

    expect(res).toEqual(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works stream (1)', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes });

    const parser = xmlTag('<');

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
      .next('div')
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
      .next('>')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    expect(res).toEqual({ type: 'XML' as TokenTypes, value: '<div>' });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

    clearVars();
  });

  test('Error', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes });

    const parser = xmlTag('<ХТМЛ>');

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
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes, isExpectNew: false });

    const parser = xmlTag('<div');

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

  test('Stream error', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes });

    const parser = xmlTag('<d');

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

    expect(res).toEqual(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

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

    expect(res).toEqual(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

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

    expect(res).toBe(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });

  test('Stream error (1)', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: 'XML' as TokenTypes });

    const parser = xmlTag('<');

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

    expect(res).toEqual(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

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

    expect(res).toEqual(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

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

    expect(res).toBe(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });
});
