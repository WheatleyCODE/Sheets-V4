import { SyncPromise } from '../../../promise';
import { sourceNumberParser } from './sourceNumberParser';

describe('sourceNumberParser', () => {
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

  describe('Zeros', () => {
    test('Work zero', () => {
      const parser = sourceNumberParser('0');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [] },
          { type: 'OR', value: { type: 'CHECK_NEXT', value: { type: 'INT_NUMBER', value: '0' } } },
          { type: 'OPT', value: [] },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });

    test('Work zero (1)', () => {
      const parser = sourceNumberParser('-0');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
          { type: 'OR', value: { type: 'CHECK_NEXT', value: { type: 'INT_NUMBER', value: '0' } } },
          { type: 'OPT', value: [] },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });

    test('Work zero (2)', () => {
      const parser = sourceNumberParser('+0');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '+' }] },
          { type: 'OR', value: { type: 'CHECK_NEXT', value: { type: 'INT_NUMBER', value: '0' } } },
          { type: 'OPT', value: [] },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });

    test('Work zero (3)', () => {
      const parser = sourceNumberParser('0.0');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [] },
          { type: 'OR', value: { type: 'CHECK_NEXT', value: { type: 'INT_NUMBER', value: '0' } } },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '0' },
                  { type: 'OPT', value: [] },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });

    test('Work zero (4)', () => {
      const parser = sourceNumberParser('0.0115');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [] },
          {
            type: 'OR',
            value: { type: 'CHECK_NEXT', value: { type: 'INT_NUMBER', value: '0' } },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '0115' },
                  { type: 'OPT', value: [] },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });

    test('Error zero', () => {
      const parser = sourceNumberParser('00');

      SyncPromise.all([...parser])
        .then((v) => {
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

    test('Error zero (1)', () => {
      const parser = sourceNumberParser('0.');

      SyncPromise.all([...parser])
        .then((v) => {
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

  describe('Numbers', () => {
    test('Work number', () => {
      const parser = sourceNumberParser('1025');
      const parser2 = sourceNumberParser('88005553535');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '1' },
                { type: 'INT_NUMBER', value: '025' },
              ],
            },
          },
          { type: 'OPT', value: [] },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);

      clearVars();

      SyncPromise.all([...parser2])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '8' },
                { type: 'INT_NUMBER', value: '8005553535' },
              ],
            },
          },
          { type: 'OPT', value: [] },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });

    test('Work number negative', () => {
      const parser = sourceNumberParser('-1025');
      const parser2 = sourceNumberParser('-88005553535');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '1' },
                { type: 'INT_NUMBER', value: '025' },
              ],
            },
          },
          { type: 'OPT', value: [] },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);

      clearVars();

      SyncPromise.all([...parser2])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '8' },
                { type: 'INT_NUMBER', value: '8005553535' },
              ],
            },
          },
          { type: 'OPT', value: [] },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });

    test('Work number positive', () => {
      const parser = sourceNumberParser('+1025');
      const parser2 = sourceNumberParser('+88005553535');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '+' }] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '1' },
                { type: 'INT_NUMBER', value: '025' },
              ],
            },
          },
          { type: 'OPT', value: [] },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);

      clearVars();

      SyncPromise.all([...parser2])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '+' }] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '8' },
                { type: 'INT_NUMBER', value: '8005553535' },
              ],
            },
          },
          { type: 'OPT', value: [] },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });
  });

  describe('Numbers fractions', () => {
    test('Work number fraction', () => {
      const parser = sourceNumberParser('45.451');
      const parser2 = sourceNumberParser('77777.777777');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '4' },
                { type: 'INT_NUMBER', value: '5' },
              ],
            },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '451' },
                  { type: 'OPT', value: [] },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);

      clearVars();

      SyncPromise.all([...parser2])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '7' },
                { type: 'INT_NUMBER', value: '7777' },
              ],
            },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '777777' },
                  { type: 'OPT', value: [] },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });

    test('Work number negative, fraction', () => {
      const parser = sourceNumberParser('-45.451');
      const parser2 = sourceNumberParser('-77777.777777');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '4' },
                { type: 'INT_NUMBER', value: '5' },
              ],
            },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '451' },
                  { type: 'OPT', value: [] },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);

      clearVars();

      SyncPromise.all([...parser2])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '7' },
                { type: 'INT_NUMBER', value: '7777' },
              ],
            },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '777777' },
                  { type: 'OPT', value: [] },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });

    test('Work number positive, fraction', () => {
      const parser = sourceNumberParser('+45.451');
      const parser2 = sourceNumberParser('+77777.777777');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '+' }] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '4' },
                { type: 'INT_NUMBER', value: '5' },
              ],
            },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '451' },
                  { type: 'OPT', value: [] },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);

      clearVars();

      SyncPromise.all([...parser2])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '+' }] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '7' },
                { type: 'INT_NUMBER', value: '7777' },
              ],
            },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '777777' },
                  { type: 'OPT', value: [] },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });
  });

  describe('Numbers fractions exponents', () => {
    test('Work number fraction exponent', () => {
      const parser = sourceNumberParser('45.451e10');
      const parser2 = sourceNumberParser('77777.777777e202020');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '4' },
                { type: 'INT_NUMBER', value: '5' },
              ],
            },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '451' },
                  {
                    type: 'OPT',
                    value: [
                      {
                        type: 'EXPONENT',
                        value: [
                          { type: 'E', value: 'e' },
                          { type: 'OPT', value: [] },
                          {
                            type: 'OR',
                            value: {
                              type: 'SEQ',
                              value: [
                                { type: 'INT_NUMBER', value: '1' },
                                { type: 'INT_NUMBER', value: '0' },
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);

      clearVars();

      SyncPromise.all([...parser2])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '7' },
                { type: 'INT_NUMBER', value: '7777' },
              ],
            },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '777777' },
                  {
                    type: 'OPT',
                    value: [
                      {
                        type: 'EXPONENT',
                        value: [
                          { type: 'E', value: 'e' },
                          { type: 'OPT', value: [] },
                          {
                            type: 'OR',
                            value: {
                              type: 'SEQ',
                              value: [
                                { type: 'INT_NUMBER', value: '2' },
                                { type: 'INT_NUMBER', value: '02020' },
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });

    test('Work number negative, fraction exponent', () => {
      const parser = sourceNumberParser('-45.451e10');
      const parser2 = sourceNumberParser('-77777.777777e202020');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '4' },
                { type: 'INT_NUMBER', value: '5' },
              ],
            },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '451' },
                  {
                    type: 'OPT',
                    value: [
                      {
                        type: 'EXPONENT',
                        value: [
                          { type: 'E', value: 'e' },
                          { type: 'OPT', value: [] },
                          {
                            type: 'OR',
                            value: {
                              type: 'SEQ',
                              value: [
                                { type: 'INT_NUMBER', value: '1' },
                                { type: 'INT_NUMBER', value: '0' },
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);

      clearVars();

      SyncPromise.all([...parser2])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '7' },
                { type: 'INT_NUMBER', value: '7777' },
              ],
            },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '777777' },
                  {
                    type: 'OPT',
                    value: [
                      {
                        type: 'EXPONENT',
                        value: [
                          { type: 'E', value: 'e' },
                          { type: 'OPT', value: [] },
                          {
                            type: 'OR',
                            value: {
                              type: 'SEQ',
                              value: [
                                { type: 'INT_NUMBER', value: '2' },
                                { type: 'INT_NUMBER', value: '02020' },
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });

    test('Work number negative, fraction exponent negative', () => {
      const parser = sourceNumberParser('-45.451e-10');
      const parser2 = sourceNumberParser('-77777.777777e-202020');

      SyncPromise.all([...parser])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '4' },
                { type: 'INT_NUMBER', value: '5' },
              ],
            },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '451' },
                  {
                    type: 'OPT',
                    value: [
                      {
                        type: 'EXPONENT',
                        value: [
                          { type: 'E', value: 'e' },
                          { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
                          {
                            type: 'OR',
                            value: {
                              type: 'SEQ',
                              value: [
                                { type: 'INT_NUMBER', value: '1' },
                                { type: 'INT_NUMBER', value: '0' },
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);

      clearVars();

      SyncPromise.all([...parser2])
        .then((v) => {
          res = v;
          thenCalls++;
        })
        .catch((e) => {
          error = e;
          catchCalls++;
        });

      res = res.at(-1);

      expect(res).toEqual({
        type: 'NUMBER',
        value: [
          { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
          {
            type: 'OR',
            value: {
              type: 'SEQ',
              value: [
                { type: 'INT_NUMBER', value: '7' },
                { type: 'INT_NUMBER', value: '7777' },
              ],
            },
          },
          {
            type: 'OPT',
            value: [
              {
                type: 'FRACTION',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '777777' },
                  {
                    type: 'OPT',
                    value: [
                      {
                        type: 'EXPONENT',
                        value: [
                          { type: 'E', value: 'e' },
                          { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
                          {
                            type: 'OR',
                            value: {
                              type: 'SEQ',
                              value: [
                                { type: 'INT_NUMBER', value: '2' },
                                { type: 'INT_NUMBER', value: '02020' },
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      expect(error).toBe(undefined);
      expect(thenCalls).toBe(1);
      expect(catchCalls).toBe(0);
    });
  });
});
