import { SyncPromise } from '../../promise';
import { TokenTypes } from '../consts';
import { seq } from '../seq/seq';
import { tag } from '../tag/tag';
import { take } from '../take/take';
import { opt } from './opt';

describe('opt', () => {
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

  test('Works', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = opt(xmlTag)('<span><div>');

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
        type: 'OPT',
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
  });

  test('Works (1)', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = opt(xmlTag)('');

    SyncPromise.all([...parser])
      .then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck(['EXPECT_NEW_INPUT', { type: 'OPT', value: [] }]);
  });

  test('Works (2)', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = opt(xmlTag)('[div]');

    SyncPromise.all([...parser])
      .then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck([{ type: 'OPT', value: [] }]);
  });
});
