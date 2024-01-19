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
      { type: 'XML_TAG_NAME', value: 'span' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'TAKE', value: 'span' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'XML_TAG_NAME', value: 'div' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'TAKE', value: 'div' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'XML_TAG_NAME', value: 'dir' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'TAKE', value: 'dir' },
          { type: 'TAG', value: '>' },
        ],
      },
      'EXPECT_NEW_INPUT',
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
      { type: 'BB_TAG_NAME', value: 'span' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '[' },
          { type: 'TAKE', value: 'span' },
          { type: 'TAG', value: ']' },
        ],
      },
      { type: 'BB_TAG_NAME', value: 'div' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '[' },
          { type: 'TAKE', value: 'div' },
          { type: 'TAG', value: ']' },
        ],
      },
      { type: 'BB_TAG_NAME', value: 'dir' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '[' },
          { type: 'TAKE', value: 'dir' },
          { type: 'TAG', value: ']' },
        ],
      },
      'EXPECT_NEW_INPUT',
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

    const parser = repeat(xmlTag)('<span><div><dir>%');

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
      { type: 'XML_TAG_NAME', value: 'div' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'TAKE', value: 'div' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'XML_TAG_NAME', value: 'dir' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'TAKE', value: 'dir' },
          { type: 'TAG', value: '>' },
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

    expect(res).toEqual({ type: 'XML_TAG_NAME', value: 'span' });
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
        { type: 'TAKE', value: 'span' },
        { type: 'TAG', value: '>' },
      ],
    });
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

    expect(res).toEqual({ type: 'XML_TAG_NAME', value: 'div' });
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
        { type: 'TAKE', value: 'div' },
        { type: 'TAG', value: '>' },
      ],
    });
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

    expect(res).toEqual({ type: 'XML_TAG_NAME', value: 'dir' });
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
        { type: 'TAKE', value: 'dir' },
        { type: 'TAG', value: '>' },
      ],
    });
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

    expect(res).toEqual(ParserStates.EXPECT_NEW_INPUT);
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
      { type: 'XML_TAG_NAME', value: 'span' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'TAKE', value: 'span' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'XML_TAG_NAME', value: 'div' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'TAKE', value: 'div' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'XML_TAG_NAME', value: 'dir' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'TAKE', value: 'dir' },
          { type: 'TAG', value: '>' },
        ],
      },
      'EXPECT_NEW_INPUT',
    ]);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Works min, max', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = repeat(xmlTag, { min: 2, max: 3 })('<span><div><dir>');

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
      { type: 'XML_TAG_NAME', value: 'div' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'TAKE', value: 'div' },
          { type: 'TAG', value: '>' },
        ],
      },
      { type: 'XML_TAG_NAME', value: 'dir' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '<' },
          { type: 'TAKE', value: 'dir' },
          { type: 'TAG', value: '>' },
        ],
      },
    ]);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });
});
