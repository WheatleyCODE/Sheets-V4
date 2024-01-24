import { SyncPromise } from '../../promise';
import { ParserStates, TokenTypes } from '../consts';
import { tag } from '../tag/tag';
import { take } from '../take/take';
import { seq } from './seq';

describe('seq', () => {
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

    const parser = xmlTag('<span>');

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
    ]);
  });

  test('Works (1)', () => {
    const xmlTag = seq(
      { token: 'BB_TAG' as TokenTypes },
      tag('['),
      take(/\w/, { token: 'BB_TAG_NAME' as TokenTypes }),
      tag(']'),
    );

    const parser = xmlTag('[span]');

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
    ]);
  });

  test('Works (2)', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes, isExpectNew: false }),
      tag('>'),
    );

    const parser = xmlTag('<span>');

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
    ]);
  });

  test('Works stream', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = xmlTag('<');

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

    positiveCheck({ type: 'TAG', value: '<' });
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

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
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

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
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

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
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

    positiveCheck({ type: 'XML_TAG_NAME', value: 'foobar' });
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

    positiveCheck({ type: 'TAG', value: '>' });
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

    positiveCheck({
      type: 'XML_TAG',
      value: [
        { type: 'TAG', value: '<' },
        { type: 'XML_TAG_NAME', value: 'foobar' },
        { type: 'TAG', value: '>' },
      ],
    });
  });

  test('Works stream (1)', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes, isExpectNew: false }),
      tag('>'),
    );

    const parser = xmlTag('<');

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

    positiveCheck({ type: 'TAG', value: '<' });
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

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
    clearVars();

    parser
      .next('tag')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck({ type: 'XML_TAG_NAME', value: 'tag' });
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

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
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

    positiveCheck({ type: 'TAG', value: '>' });
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

    positiveCheck({
      type: 'XML_TAG',
      value: [
        { type: 'TAG', value: '<' },
        { type: 'XML_TAG_NAME', value: 'tag' },
        { type: 'TAG', value: '>' },
      ],
    });
  });

  test('Error', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { min: 5, token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = xmlTag('<span>');

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

  test('Error (2)', () => {
    const xmlTag = seq(
      { token: 'BB_TAG' as TokenTypes },
      tag('['),
      take(/\w/, { token: 'BB_TAG_NAME' as TokenTypes }),
      tag(']'),
    );

    const parser = xmlTag('[sp%an]');

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

  test('Error (3)', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('$'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('$'),
    );

    const parser = xmlTag('<span>');

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

  test('Error stream', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes }),
      tag('>'),
    );

    const parser = xmlTag('<');

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

    positiveCheck({ type: 'TAG', value: '<' });
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

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
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

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
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

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
    clearVars();

    parser
      .next('$$$$$$$boom')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck({ type: 'XML_TAG_NAME', value: 'foobar' });
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

    negativeCheck();
  });

  test('Error stream (1)', () => {
    const xmlTag = seq(
      { token: 'XML_TAG' as TokenTypes },
      tag('<'),
      take(/\w/, { token: 'XML_TAG_NAME' as TokenTypes, isExpectNew: false }),
      tag('>'),
    );

    const parser = xmlTag('<');

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

    positiveCheck({ type: 'TAG', value: '<' });
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

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
    clearVars();

    parser
      .next('tag')
      .value.then((v) => {
        res = v;
        thenCalls++;
      })
      .catch((e) => {
        error = e;
        catchCalls++;
      });

    positiveCheck({ type: 'XML_TAG_NAME', value: 'tag' });
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

    positiveCheck(ParserStates.EXPECT_NEW_INPUT);
    clearVars();

    parser
      .next('%%%')
      .value.then((v) => {
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
