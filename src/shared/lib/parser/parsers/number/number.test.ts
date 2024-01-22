import { SyncPromise } from '../../../promise';
import { number } from './number';

describe('number', () => {
  // test('Work zero', () => {
  //   const parser = number('0');

  //   let res: any;
  //   let error: any;
  //   let thenCalls = 0;
  //   let catchCalls = 0;

  //   SyncPromise.all([...parser])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   // res = res.at(-1);

  //   console.dir(res, { depth: null });

  //   expect(res).toEqual(undefined);
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);
  // });

  test('Work zero ()', () => {
    const parser = number('0.0');

    let res: any;
    let error: any;
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

    res = res.at(-1);

    expect(res).toEqual({
      type: 'NUMBER',
      value: [
        { type: 'OPT', value: [] },
        {
          type: 'OR',
          value: {
            type: 'ZERO_TO_FRACTION',
            value: [
              { type: 'INT_NUMBER', value: '0' },
              {
                type: 'FRACTION ',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '0' },
                  { type: 'OPT', value: [] },
                ],
              },
            ],
          },
        },
      ],
    });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Error zero', () => {
    const parser = number('00');

    let res: any;
    let error: any;
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

    expect(res).toBe(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });

  test('Error zero (1)', () => {
    const parser = number('0.');

    let res: any;
    let error: any;
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

    expect(res).toBe(undefined);
    expect(error).not.toBe(undefined);
    expect(thenCalls).toBe(0);
    expect(catchCalls).toBe(1);
  });

  test('Work zero + fraction', () => {
    const parser = number('0.0115');

    let res: any;
    let error: any;
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

    res = res.at(-1);

    expect(res).toEqual({
      type: 'NUMBER',
      value: [
        { type: 'OPT', value: [] },
        {
          type: 'OR',
          value: {
            type: 'ZERO_TO_FRACTION',
            value: [
              { type: 'INT_NUMBER', value: '0' },
              {
                type: 'FRACTION ',
                value: [
                  { type: 'DOT', value: '.' },
                  { type: 'INT_NUMBER', value: '0115' },
                  { type: 'OPT', value: [] },
                ],
              },
            ],
          },
        },
      ],
    });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  test('Work simple', () => {
    const parser = number('1025');

    let res: any;
    let error: any;
    let thenCalls = 0;
    let catchCalls = 0;

    const clearVars = () => {
      res = [];
      error = undefined;
      thenCalls = 0;
      catchCalls = 0;
    };

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
        { type: 'OR', value: { type: 'INT_NUMBER', value: '1' } },
      ],
    });
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);

    clearVars();

    const parser2 = number('88005553535');

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

    console.dir(res, { depth: null });

    expect(res).toEqual(null);
    expect(error).toBe(undefined);
    expect(thenCalls).toBe(1);
    expect(catchCalls).toBe(0);
  });

  // test('Work simple negative (1)', () => {
  //   const parser = number('-1045');

  //   let res: any;
  //   let error: any;
  //   let thenCalls = 0;
  //   let catchCalls = 0;

  //   const clearVars = () => {
  //     res = [];
  //     error = undefined;
  //     thenCalls = 0;
  //     catchCalls = 0;
  //   };

  //   SyncPromise.all([...parser])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   res = res.at(-1);

  //   expect(res).toEqual({
  //     type: 'NUMBER',
  //     value: [
  //       { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
  //       { type: 'INT_NUMBERS', value: '1045' },
  //       { type: 'OPT', value: [] },
  //     ],
  //   });
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);

  //   clearVars();

  //   const parser2 = number('-88005553535');

  //   SyncPromise.all([...parser2])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   res = res.at(-1);

  //   expect(res).toEqual({
  //     type: 'NUMBER',
  //     value: [
  //       { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
  //       { type: 'INT_NUMBERS', value: '88005553535' },
  //       { type: 'OPT', value: [] },
  //     ],
  //   });
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);
  // });

  // test('Work simple fraction', () => {
  //   const parser = number('10.22');

  //   let res: any;
  //   let error: any;
  //   let thenCalls = 0;
  //   let catchCalls = 0;

  //   const clearVars = () => {
  //     res = [];
  //     error = undefined;
  //     thenCalls = 0;
  //     catchCalls = 0;
  //   };

  //   SyncPromise.all([...parser])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   res = res.at(-1);

  //   expect(res).toEqual({
  //     type: 'NUMBER',
  //     value: [
  //       { type: 'OPT', value: [] },
  //       { type: 'INT_NUMBERS', value: '10' },
  //       {
  //         type: 'OPT',
  //         value: [
  //           {
  //             type: 'FRACTION ',
  //             value: [
  //               { type: 'DOT', value: '.' },
  //               { type: 'INT_NUMBERS', value: '22' },
  //               { type: 'OPT', value: [] },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);

  //   clearVars();

  //   const parser2 = number('56.123456789001010101');

  //   SyncPromise.all([...parser2])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   res = res.at(-1);

  //   expect(res).toEqual({
  //     type: 'NUMBER',
  //     value: [
  //       { type: 'OPT', value: [] },
  //       { type: 'INT_NUMBERS', value: '56' },
  //       {
  //         type: 'OPT',
  //         value: [
  //           {
  //             type: 'FRACTION ',
  //             value: [
  //               { type: 'DOT', value: '.' },
  //               { type: 'INT_NUMBERS', value: '123456789001010101' },
  //               { type: 'OPT', value: [] },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);
  // });

  // test('Work simple negative fraction', () => {
  //   const parser = number('-10.22');

  //   let res: any;
  //   let error: any;
  //   let thenCalls = 0;
  //   let catchCalls = 0;

  //   const clearVars = () => {
  //     res = [];
  //     error = undefined;
  //     thenCalls = 0;
  //     catchCalls = 0;
  //   };

  //   SyncPromise.all([...parser])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   res = res.at(-1);

  //   expect(res).toEqual({
  //     type: 'NUMBER',
  //     value: [
  //       { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
  //       { type: 'INT_NUMBERS', value: '10' },
  //       {
  //         type: 'OPT',
  //         value: [
  //           {
  //             type: 'FRACTION ',
  //             value: [
  //               { type: 'DOT', value: '.' },
  //               { type: 'INT_NUMBERS', value: '22' },
  //               { type: 'OPT', value: [] },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);

  //   clearVars();

  //   const parser2 = number('-56.123456789001010101');

  //   SyncPromise.all([...parser2])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   res = res.at(-1);

  //   expect(res).toEqual({
  //     type: 'NUMBER',
  //     value: [
  //       { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
  //       { type: 'INT_NUMBERS', value: '56' },
  //       {
  //         type: 'OPT',
  //         value: [
  //           {
  //             type: 'FRACTION ',
  //             value: [
  //               { type: 'DOT', value: '.' },
  //               { type: 'INT_NUMBERS', value: '123456789001010101' },
  //               { type: 'OPT', value: [] },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);
  // });

  // test('Work simple fraction exponent', () => {
  //   const parser = number('102020.10e120');

  //   let res: any[] = [];
  //   let error;
  //   let thenCalls = 0;
  //   let catchCalls = 0;

  //   const clearVars = () => {
  //     res = [];
  //     error = undefined;
  //     thenCalls = 0;
  //     catchCalls = 0;
  //   };

  //   SyncPromise.all([...parser])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   res = res.at(-1);

  //   expect(res).toEqual({
  //     type: 'NUMBER',
  //     value: [
  //       { type: 'OPT', value: [] },
  //       { type: 'INT_NUMBERS', value: '102020' },
  //       {
  //         type: 'OPT',
  //         value: [
  //           {
  //             type: 'FRACTION ',
  //             value: [
  //               { type: 'DOT', value: '.' },
  //               { type: 'INT_NUMBERS', value: '10' },
  //               {
  //                 type: 'OPT',
  //                 value: [
  //                   {
  //                     type: 'EXPONENT',
  //                     value: [
  //                       { type: 'E', value: 'e' },
  //                       { type: 'OPT', value: [] },
  //                       { type: 'INT_NUMBERS', value: '120' },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);

  //   clearVars();

  //   const parser2 = number('5049.94e10');

  //   SyncPromise.all([...parser2])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   res = res.at(-1);

  //   console.dir(res, { depth: null });

  //   expect(res).toEqual({
  //     type: 'NUMBER',
  //     value: [
  //       { type: 'OPT', value: [] },
  //       { type: 'INT_NUMBERS', value: '5049' },
  //       {
  //         type: 'OPT',
  //         value: [
  //           {
  //             type: 'FRACTION ',
  //             value: [
  //               { type: 'DOT', value: '.' },
  //               { type: 'INT_NUMBERS', value: '94' },
  //               {
  //                 type: 'OPT',
  //                 value: [
  //                   {
  //                     type: 'EXPONENT',
  //                     value: [
  //                       { type: 'E', value: 'e' },
  //                       { type: 'OPT', value: [] },
  //                       { type: 'INT_NUMBERS', value: '10' },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);
  // });

  // test('Work simple negative fraction exponent', () => {
  //   const parser = number('-102020.10e120');

  //   let res: any[] = [];
  //   let error;
  //   let thenCalls = 0;
  //   let catchCalls = 0;

  //   const clearVars = () => {
  //     res = [];
  //     error = undefined;
  //     thenCalls = 0;
  //     catchCalls = 0;
  //   };

  //   SyncPromise.all([...parser])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   res = res.at(-1);

  //   expect(res).toEqual({
  //     type: 'NUMBER',
  //     value: [
  //       { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
  //       { type: 'INT_NUMBERS', value: '102020' },
  //       {
  //         type: 'OPT',
  //         value: [
  //           {
  //             type: 'FRACTION ',
  //             value: [
  //               { type: 'DOT', value: '.' },
  //               { type: 'INT_NUMBERS', value: '10' },
  //               {
  //                 type: 'OPT',
  //                 value: [
  //                   {
  //                     type: 'EXPONENT',
  //                     value: [
  //                       { type: 'E', value: 'e' },
  //                       { type: 'OPT', value: [] },
  //                       { type: 'INT_NUMBERS', value: '120' },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);

  //   clearVars();

  //   const parser2 = number('-5049.94e10');

  //   SyncPromise.all([...parser2])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   res = res.at(-1);

  //   console.dir(res, { depth: null });

  //   expect(res).toEqual({
  //     type: 'NUMBER',
  //     value: [
  //       { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
  //       { type: 'INT_NUMBERS', value: '5049' },
  //       {
  //         type: 'OPT',
  //         value: [
  //           {
  //             type: 'FRACTION ',
  //             value: [
  //               { type: 'DOT', value: '.' },
  //               { type: 'INT_NUMBERS', value: '94' },
  //               {
  //                 type: 'OPT',
  //                 value: [
  //                   {
  //                     type: 'EXPONENT',
  //                     value: [
  //                       { type: 'E', value: 'e' },
  //                       { type: 'OPT', value: [] },
  //                       { type: 'INT_NUMBERS', value: '10' },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);
  // });

  // test('Work simple negative fraction exponent negative', () => {
  //   const parser = number('-102020.10e-120');

  //   let res: any[] = [];
  //   let error;
  //   let thenCalls = 0;
  //   let catchCalls = 0;

  //   const clearVars = () => {
  //     res = [];
  //     error = undefined;
  //     thenCalls = 0;
  //     catchCalls = 0;
  //   };

  //   SyncPromise.all([...parser])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   res = res.at(-1);

  //   expect(res).toEqual({
  //     type: 'NUMBER',
  //     value: [
  //       { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
  //       { type: 'INT_NUMBERS', value: '102020' },
  //       {
  //         type: 'OPT',
  //         value: [
  //           {
  //             type: 'FRACTION ',
  //             value: [
  //               { type: 'DOT', value: '.' },
  //               { type: 'INT_NUMBERS', value: '10' },
  //               {
  //                 type: 'OPT',
  //                 value: [
  //                   {
  //                     type: 'EXPONENT',
  //                     value: [
  //                       { type: 'E', value: 'e' },
  //                       { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
  //                       { type: 'INT_NUMBERS', value: '120' },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);

  //   clearVars();

  //   const parser2 = number('-5049.94e-10');

  //   SyncPromise.all([...parser2])
  //     .then((v) => {
  //       res = v;
  //       thenCalls++;
  //     })
  //     .catch((e) => {
  //       error = e;
  //       catchCalls++;
  //     });

  //   res = res.at(-1);

  //   console.dir(res, { depth: null });

  //   expect(res).toEqual({
  //     type: 'NUMBER',
  //     value: [
  //       { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
  //       { type: 'INT_NUMBERS', value: '5049' },
  //       {
  //         type: 'OPT',
  //         value: [
  //           {
  //             type: 'FRACTION ',
  //             value: [
  //               { type: 'DOT', value: '.' },
  //               { type: 'INT_NUMBERS', value: '94' },
  //               {
  //                 type: 'OPT',
  //                 value: [
  //                   {
  //                     type: 'EXPONENT',
  //                     value: [
  //                       { type: 'E', value: 'e' },
  //                       { type: 'OPT', value: [{ type: 'SING', value: '-' }] },
  //                       { type: 'INT_NUMBERS', value: '10' },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   expect(error).toBe(undefined);
  //   expect(thenCalls).toBe(1);
  //   expect(catchCalls).toBe(0);
  // });
});
