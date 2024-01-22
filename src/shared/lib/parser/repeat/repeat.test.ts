import { SyncPromise } from '../../promise';
import { ParserStates, TokenTypes } from '../consts';
import { seq } from '../seq/seq';
import { tag } from '../tag/tag';
import { take } from '../take/take';
import { repeat } from './repeat';

describe('repeat', () => {
  test('Works', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = repeat(xmlTag)('<span><div><dir>');

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
      { type: 'TAG', value: '<' },
      { type: 'XML_TAG_NAME', value: 'span' },
      { type: 'TAG', value: '>' },
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'span' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'TAG', value: '<' },
      { type: 'XML_TAG_NAME', value: 'div' },
      { type: 'TAG', value: '>' },
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'div' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'TAG', value: '<' },
      { type: 'XML_TAG_NAME', value: 'dir' },
      { type: 'TAG', value: '>' },
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'dir' },
          { type: 'TAG', value: '>' },
        ],
      },
      'EXPECT_NEW_INPUT',
      {
        type: 'REPEAT',
        value: [
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'span' },
              { type: 'TAG', value: '>' },
            ],
          },
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'div' },
              { type: 'TAG', value: '>' },
            ],
          },
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'dir' },
              { type: 'TAG', value: '>' },
            ],
          },
        ],
      },
    ]);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works (1)', () => {
    const bbTag = seq(
      { token: 'BB_TAG' as TokenTypes },
      tag('['),
      take(/\w/, { token: 'BB_TAG_NAME' as TokenTypes }),
      tag(']'),
    );

    const parser = repeat(bbTag)('[span][div][dir]');

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
      { type: 'TAG', value: '[' },
      { type: 'BB_TAG_NAME', value: 'span' },
      { type: 'TAG', value: ']' },
      {
        type: 'BB_TAG',
        value: [
          { type: 'TAG', value: '[' },
          { type: 'BB_TAG_NAME', value: 'span' },
          { type: 'TAG', value: ']' },
        ],
      },
      { type: 'TAG', value: '[' },
      { type: 'BB_TAG_NAME', value: 'div' },
      { type: 'TAG', value: ']' },
      {
        type: 'BB_TAG',
        value: [
          { type: 'TAG', value: '[' },
          { type: 'BB_TAG_NAME', value: 'div' },
          { type: 'TAG', value: ']' },
        ],
      },
      { type: 'TAG', value: '[' },
      { type: 'BB_TAG_NAME', value: 'dir' },
      { type: 'TAG', value: ']' },
      {
        type: 'BB_TAG',
        value: [
          { type: 'TAG', value: '[' },
          { type: 'BB_TAG_NAME', value: 'dir' },
          { type: 'TAG', value: ']' },
        ],
      },
      'EXPECT_NEW_INPUT',
      {
        type: 'REPEAT',
        value: [
          {
            type: 'BB_TAG',
            value: [
              { type: 'TAG', value: '[' },
              { type: 'BB_TAG_NAME', value: 'span' },
              { type: 'TAG', value: ']' },
            ],
          },
          {
            type: 'BB_TAG',
            value: [
              { type: 'TAG', value: '[' },
              { type: 'BB_TAG_NAME', value: 'div' },
              { type: 'TAG', value: ']' },
            ],
          },
          {
            type: 'BB_TAG',
            value: [
              { type: 'TAG', value: '[' },
              { type: 'BB_TAG_NAME', value: 'dir' },
              { type: 'TAG', value: ']' },
            ],
          },
        ],
      },
    ]);
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

    const parser = repeat(xmlTag)('<span><div>%');

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
      { type: 'TAG', value: '<' },
      { type: 'XML_TAG_NAME', value: 'span' },
      { type: 'TAG', value: '>' },
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'span' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'TAG', value: '<' },
      { type: 'XML_TAG_NAME', value: 'div' },
      { type: 'TAG', value: '>' },
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'div' },
          { type: 'TAG', value: '>' },
        ],
      },
      {
        type: 'REPEAT',
        value: [
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'span' },
              { type: 'TAG', value: '>' },
            ],
          },
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'div' },
              { type: 'TAG', value: '>' },
            ],
          },
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

    const parser = repeat(xmlTag)('<span><div><dir>');

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

    const testFn = (resData: any, isError: boolean, thenCls: number, catchCls: number, next?: any) => {
      parser
        .next(next)
        .value.then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      expect(res).toEqual(resData);
      expect(thenCalls).toBe(thenCls);

      if (isError) {
        expect(thenCalls).not.toBe(undefined);
      } else {
        expect(error).toBe(undefined);
      }
      expect(catchCalls).toBe(catchCls);

      clearVars();
    };

    testFn({ type: 'TAG', value: '<' }, false, 1, 0);
    testFn({ type: 'XML_TAG_NAME', value: 'span' }, false, 1, 0);
    testFn({ type: 'TAG', value: '>' }, false, 1, 0);
    testFn(
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'span' },
          { type: 'TAG', value: '>' },
        ],
      },
      false,
      1,
      0,
    );

    testFn({ type: 'TAG', value: '<' }, false, 1, 0);
    testFn({ type: 'XML_TAG_NAME', value: 'div' }, false, 1, 0);
    testFn({ type: 'TAG', value: '>' }, false, 1, 0);
    testFn(
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'div' },
          { type: 'TAG', value: '>' },
        ],
      },
      false,
      1,
      0,
    );

    testFn({ type: 'TAG', value: '<' }, false, 1, 0);
    testFn({ type: 'XML_TAG_NAME', value: 'dir' }, false, 1, 0);
    testFn({ type: 'TAG', value: '>' }, false, 1, 0);
    testFn(
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'dir' },
          { type: 'TAG', value: '>' },
        ],
      },
      false,
      1,
      0,
    );

    testFn(ParserStates.EXPECT_NEW_INPUT, false, 1, 0);

    testFn(
      {
        type: 'REPEAT',
        value: [
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'span' },
              { type: 'TAG', value: '>' },
            ],
          },
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'div' },
              { type: 'TAG', value: '>' },
            ],
          },
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'dir' },
              { type: 'TAG', value: '>' },
            ],
          },
        ],
      },
      false,
      1,
      0,
    );
  });

  test('Works stream (1)', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = repeat(xmlTag)('<span>');

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

    const testFn = (resData: any, isError: boolean, thenCls: number, catchCls: number, next?: any) => {
      parser
        .next(next)
        .value.then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      expect(res).toEqual(resData);
      expect(thenCalls).toBe(thenCls);

      if (isError) {
        expect(thenCalls).not.toBe(undefined);
      } else {
        expect(error).toBe(undefined);
      }
      expect(catchCalls).toBe(catchCls);

      clearVars();
    };

    testFn({ type: 'TAG', value: '<' }, false, 1, 0);
    testFn({ type: 'XML_TAG_NAME', value: 'span' }, false, 1, 0);
    testFn({ type: 'TAG', value: '>' }, false, 1, 0);
    testFn(
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'span' },
          { type: 'TAG', value: '>' },
        ],
      },
      false,
      1,
      0,
    );

    testFn(ParserStates.EXPECT_NEW_INPUT, false, 1, 0);
    testFn({ type: 'TAG', value: '<' }, false, 1, 0, '<div>');
    testFn({ type: 'XML_TAG_NAME', value: 'div' }, false, 1, 0);
    testFn({ type: 'TAG', value: '>' }, false, 1, 0);
    testFn(
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'div' },
          { type: 'TAG', value: '>' },
        ],
      },
      false,
      1,
      0,
    );

    testFn(ParserStates.EXPECT_NEW_INPUT, false, 1, 0);
    testFn({ type: 'TAG', value: '<' }, false, 1, 0, '<foobar>');
    testFn({ type: 'XML_TAG_NAME', value: 'foobar' }, false, 1, 0);
    testFn({ type: 'TAG', value: '>' }, false, 1, 0);
    testFn(
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'foobar' },
          { type: 'TAG', value: '>' },
        ],
      },
      false,
      1,
      0,
    );

    testFn(ParserStates.EXPECT_NEW_INPUT, false, 1, 0);
    testFn(
      {
        type: 'REPEAT',
        value: [
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'span' },
              { type: 'TAG', value: '>' },
            ],
          },
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'div' },
              { type: 'TAG', value: '>' },
            ],
          },
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'foobar' },
              { type: 'TAG', value: '>' },
            ],
          },
        ],
      },
      false,
      1,
      0,
    );
  });

  test('Works max', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = repeat(xmlTag, { max: 3 })('<span><div><dir>');

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
      { type: 'TAG', value: '<' },
      { type: 'XML_TAG_NAME', value: 'span' },
      { type: 'TAG', value: '>' },
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'span' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'TAG', value: '<' },
      { type: 'XML_TAG_NAME', value: 'div' },
      { type: 'TAG', value: '>' },
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'div' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'TAG', value: '<' },
      { type: 'XML_TAG_NAME', value: 'dir' },
      { type: 'TAG', value: '>' },
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'dir' },
          { type: 'TAG', value: '>' },
        ],
      },
      // * Нет EXPECT_NEW_INPUT
      {
        type: 'REPEAT',
        value: [
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'span' },
              { type: 'TAG', value: '>' },
            ],
          },
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'div' },
              { type: 'TAG', value: '>' },
            ],
          },
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'dir' },
              { type: 'TAG', value: '>' },
            ],
          },
        ],
      },
    ]);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works max (1)', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = repeat(xmlTag, { max: 3 })('<span>');

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
      { type: 'TAG', value: '<' },
      { type: 'XML_TAG_NAME', value: 'span' },
      { type: 'TAG', value: '>' },
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'span' },
          { type: 'TAG', value: '>' },
        ],
      },
      'EXPECT_NEW_INPUT',
      {
        type: 'REPEAT',
        value: [
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'span' },
              { type: 'TAG', value: '>' },
            ],
          },
        ],
      },
    ]);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works min', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = repeat(xmlTag, { min: 3 })('<span><div><dir>');

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
      { type: 'TAG', value: '<' },
      { type: 'XML_TAG_NAME', value: 'span' },
      { type: 'TAG', value: '>' },
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'span' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'TAG', value: '<' },
      { type: 'XML_TAG_NAME', value: 'div' },
      { type: 'TAG', value: '>' },
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'div' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'TAG', value: '<' },
      { type: 'XML_TAG_NAME', value: 'dir' },
      { type: 'TAG', value: '>' },
      {
        type: 'XML_TAG',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'XML_TAG_NAME', value: 'dir' },
          { type: 'TAG', value: '>' },
        ],
      },
      'EXPECT_NEW_INPUT',
      {
        type: 'REPEAT',
        value: [
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'span' },
              { type: 'TAG', value: '>' },
            ],
          },
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'div' },
              { type: 'TAG', value: '>' },
            ],
          },
          {
            type: 'XML_TAG',
            value: [
              { type: 'TAG', value: '<' },
              { type: 'XML_TAG_NAME', value: 'dir' },
              { type: 'TAG', value: '>' },
            ],
          },
        ],
      },
    ]);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Error', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = repeat(xmlTag)('[span]<div><dir>');

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

  test('Error (1)', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = repeat(xmlTag, { min: 2 })('<span>[div]<dir>');

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
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = repeat(xmlTag, { min: 3 })('<span><div>[dir]');

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
});
