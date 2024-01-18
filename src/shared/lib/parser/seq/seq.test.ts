import { SyncPromise } from '../../promise';
import { ParserStates, TokenTypes } from '../consts';
import { tag } from '../tag/tag';
import { take } from '../take/take';
import { seq } from './seq';

describe('seq', () => {
  test('Works', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = xmlTag('<span>');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

    SyncPromise.all([...parser])
      .then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    expect(res).toEqual([
      { type: 'XML_TAG_NAME', value: 'span' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'TAKE', value: 'span' },
          { type: 'TAG', value: '>' },
        ],
      },
    ]);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works (2)', () => {
    const xmlTag = seq(
      { token: 'BB_TAG' as TokenTypes },
      tag('['),
      take(/\w/, { token: 'BB_TAG_NAME' as TokenTypes }),
      tag(']'),
    );

    const parser = xmlTag('[span]');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

    SyncPromise.all([...parser])
      .then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    expect(res).toEqual([
      { type: 'BB_TAG_NAME', value: 'span' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '[' },
          { type: 'TAKE', value: 'span' },
          { type: 'TAG', value: ']' },
        ],
      },
    ]);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works stream', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

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
      .next('foo')
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
      .next('bar')
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
      .next('>')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    expect(res).toEqual({ type: 'XML_TAG_NAME', value: 'foobar' });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

    clearVars();

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
      type: 'SEQ',
      value: [
        { type: 'TAG', value: '<' },
        { type: 'TAKE', value: 'foobar' },
        { type: 'TAG', value: '>' },
      ],
    });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Error', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { min: 5, token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = xmlTag('<span>');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

    SyncPromise.all([...parser])
      .then((v) => {
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

  test('Error (2)', () => {
    const xmlTag = seq(
      { token: 'BB_TAG' as TokenTypes },
      tag('['),
      take(/\w/, { token: 'BB_TAG_NAME' as TokenTypes }),
      tag(']'),
    );

    const parser = xmlTag('[sp%an]');

    let res;
    let error;
    let thenCalls = 0;
    let catchCalls = 0;

    SyncPromise.all([...parser])
      .then((v) => {
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

  test('Error stream', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

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
      .next('foo')
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
      .next('bar')
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
      .next('%')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    expect(res).toEqual({ type: 'XML_TAG_NAME', value: 'foobar' });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

    clearVars();

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
});
