import { SyncPromise } from '../../promise';
import { TokenTypes } from '../consts';
import { seq } from '../seq/seq';
import { tag } from '../tag/tag';
import { take } from '../take/take';
import { or } from './or';

describe('or', () => {
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

    SyncPromise.all([...parser])
      .then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck([
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
      {
        type: 'OR',
        value: {
          type: 'XML_TAG',
          value: [
            { type: 'TAG', value: '<' },
            { type: 'XML_TAG_NAME', value: 'span' },
            { type: 'TAG', value: '>' },
          ],
        },
      },
    ]);
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

    SyncPromise.all([...parser])
      .then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck([
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
      {
        type: 'OR',
        value: {
          type: 'BB_TAG',
          value: [
            { type: 'TAG', value: '[' },
            { type: 'BB_TAG_NAME', value: 'span' },
            { type: 'TAG', value: ']' },
          ],
        },
      },
    ]);
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

    SyncPromise.all([...parser])
      .then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck([
      { type: 'TAG', value: '{' },
      { type: 'PP_TAG_NAME', value: 'span' },
      { type: 'TAG', value: '}' },
      {
        type: 'PP_TAG',
        value: [
          { type: 'TAG', value: '{' },
          { type: 'PP_TAG_NAME', value: 'span' },
          { type: 'TAG', value: '}' },
        ],
      },
      {
        type: 'OR',
        value: {
          type: 'PP_TAG',
          value: [
            { type: 'TAG', value: '{' },
            { type: 'PP_TAG_NAME', value: 'span' },
            { type: 'TAG', value: '}' },
          ],
        },
      },
    ]);
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

    SyncPromise.all([...parser])
      .then((v) => {
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
