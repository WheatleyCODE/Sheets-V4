import { SyncPromise } from '../../promise';
import { TokenTypes } from '../consts';
import { seq } from '../seq/seq';
import { tag } from '../tag/tag';
import { take } from '../take/take';
import { or } from './or';

describe('seq', () => {
  test('Works', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const bbTag = seq(
      { token: 'BB_TAG' as TokenTypes },
      tag('['),
      take(/\w/, { token: 'BB_TAG_NAME' as TokenTypes }),
      tag(']'),
    );

    const ppTag = seq(
      { token: 'PP_TAG' as TokenTypes },
      tag('{'),
      take(/\w/, { token: 'PP_TAG_NAME' as TokenTypes }),
      tag('}'),
    );

    const parser = or(xmlTag, bbTag, ppTag)('<span>');

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
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const bbTag = seq(
      { token: 'BB_TAG' as TokenTypes },
      tag('['),
      take(/\w/, { token: 'BB_TAG_NAME' as TokenTypes }),
      tag(']'),
    );

    const ppTag = seq(
      { token: 'PP_TAG' as TokenTypes },
      tag('{'),
      take(/\w/, { token: 'PP_TAG_NAME' as TokenTypes }),
      tag('}'),
    );

    const parser = or(xmlTag, bbTag, ppTag)('[span]');

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

  test('Works (3)', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const bbTag = seq(
      { token: 'BB_TAG' as TokenTypes },
      tag('['),
      take(/\w/, { token: 'BB_TAG_NAME' as TokenTypes }),
      tag(']'),
    );

    const ppTag = seq(
      { token: 'PP_TAG' as TokenTypes },
      tag('{'),
      take(/\w/, { token: 'PP_TAG_NAME' as TokenTypes }),
      tag('}'),
    );

    const parser = or(xmlTag, bbTag, ppTag)('{span}');

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
      { type: 'PP_TAG_NAME', value: 'span' },
      {
        type: 'SEQ',
        value: [
          { type: 'TAG', value: '{' },
          { type: 'TAKE', value: 'span' },
          { type: 'TAG', value: '}' },
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

    const bbTag = seq(
      { token: 'BB_TAG' as TokenTypes },
      tag('['),
      take(/\w/, { token: 'BB_TAG_NAME' as TokenTypes }),
      tag(']'),
    );

    const ppTag = seq(
      { token: 'PP_TAG' as TokenTypes },
      tag('{'),
      take(/\w/, { token: 'PP_TAG_NAME' as TokenTypes }),
      tag('}'),
    );

    const parser = or(xmlTag, bbTag, ppTag)('%span%');

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
