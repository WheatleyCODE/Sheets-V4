import { ParserStates, ParserSymbols, TokenTypes } from '../consts';
import { seq } from '../seq/seq';
import { tag } from '../tag/tag';
import { take } from '../take/take';
import { checkAfter } from './checkAfter';

describe('repeat', () => {
  test('Works', () => {
    const parserTest = checkAfter(tag('A'), (char) => char === '%');

    const parser = parserTest('A%FFFF');

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
    const parserTest = checkAfter(tag('<div>'), /\d/);

    const parser = parserTest('<div>1');

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

    expect(res).toEqual({ type: 'CHECK_NEXT', value: { type: 'TAG', value: '<div>' } });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works (2)', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parserTest = checkAfter(xmlTag, /\d/);

    const parser = parserTest('<div>1');

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

    expect(res).toEqual({
      type: 'CHECK_NEXT',
      value: {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'div' },
          { type: 'TAG', value: '>' },
        ],
      },
    });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works (3)', () => {
    const xmlTag = seq(
      { token: 'BB_TAG' as TokenTypes },
      tag('['),
      take(/\w/, { token: 'BB_TAG_NAME' as TokenTypes }),
      tag(']'),
    );

    const parserTest = checkAfter(xmlTag, ParserSymbols.STRING_END);

    const parser = parserTest('[div]');

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

    expect(res).toEqual({
      type: 'CHECK_NEXT',
      value: {
        type: 'BB_TAG',
        value: [
          { type: 'TAG', value: '[' },
          { type: 'BB_TAG_NAME', value: 'div' },
          { type: 'TAG', value: ']' },
        ],
      },
    });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Error', () => {
    const parserTest = checkAfter(tag('A'), (char) => char === '%');

    const parser = parserTest('ABCD');

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
    const parserTest = checkAfter(tag('[hello]'), '%');

    const parser = parserTest('[hello]');

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
      .next('>>>>')
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
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parserTest = checkAfter(xmlTag, /\d/);

    const parser = parserTest('<div>%');

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

  test('Error stream (1)', () => {
    const xmlTag = seq(
      { token: 'BB_TAG' as TokenTypes },
      tag('['),
      take(/\w/, { token: 'BB_TAG_NAME' as TokenTypes }),
      tag(']'),
    );

    const parserTest = checkAfter(xmlTag, ' ');

    const parser = parserTest('[div]');

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
      .next('bla')
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
