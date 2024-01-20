import { SyncPromise } from '../../promise';
import { TokenTypes } from '../consts';
import { seq } from '../seq/seq';
import { tag } from '../tag/tag';
import { take } from '../take/take';
import { opt } from './opt';

describe('opt', () => {
  test('Works', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = opt(xmlTag)('<span><div>');

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

  test('Works (1)', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = opt(xmlTag)('');

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

    expect(res).toEqual(['EXPECT_NEW_INPUT']);
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

    const parser = opt(xmlTag)('[div]');

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

    expect(res).toEqual([]);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });
});
