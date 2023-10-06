// ? Как это протестировать ?

describe('onStream', () => {
  test('onStream', () => {
    expect(null).toBe(null);
  });
});

// async function streamTests() {
//   const strm = onStream<MouseEvent>(document.body, 'click');

//   const stream = strm
//     .filter(({ clientX }) => clientX < 100)
//     .map(({ clientX, clientY }) => ({ clientX, clientY }))
//     .map((clientRect) => ({ clientRect, flag: true }));

//   stream.subscribe((el) => console.log(el.clientRect, 'this is subs'));
//   stream.subscribe((el) => console.log(el.flag, 'this is subs2'));

//   for await (const e of stream) {
//     console.log(e);
//   }
// }

// streamTests();
