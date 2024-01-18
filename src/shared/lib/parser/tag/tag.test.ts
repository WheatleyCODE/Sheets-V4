import { ParserStates, TokenTypes } from '../consts';
import { tag } from './tag';

describe('tag', () => {
  test('Works', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: TokenTypes.XML });

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

    expect(res).toEqual({ type: TokenTypes.XML, value: '<div>' });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works stream', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: TokenTypes.XML });

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

    expect(res).toBe(ParserStates.EXPECT_NEW_INPUT);
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

    expect(res).toEqual({ type: TokenTypes.XML, value: '<div>' });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

    clearVars();
  });

  test('Error data', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: TokenTypes.XML });

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

  test('Stream error data', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: TokenTypes.XML });

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
});
