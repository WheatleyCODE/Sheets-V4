import { SyncPromise } from './SyncPromise';

describe('SyncPromise', () => {
  describe('SyncPromise base', () => {
    test('SyncPromise works', () => {
      const promise = new SyncPromise<number>((resolve) => resolve(42));

      let finallyIsCall = false;
      let catchIsCall = false;
      let result = 0;

      promise
        .then((value) => value + 100)
        .then((value) => value + 10)
        .then((value) => {
          result = value - 2;
          return value - 2;
        })
        .catch(() => {
          catchIsCall = true;
        })
        .finally(() => {
          finallyIsCall = true;
        });

      expect(promise[Symbol.toStringTag]).toBe('SyncPromise');
      expect(result).toBe(150);
      expect(catchIsCall).toBe(false);
      expect(finallyIsCall).toBe(true);
    });

    test('SyncPromise error', () => {
      const promise = new SyncPromise<number>((resolve) => resolve(42));

      let finallyIsCall = false;
      let catchIsCall = false;
      let result = 0;

      promise
        .then((value) => value + 100)
        .then((value) => value + 10)
        .then((value) => {
          result = value - 2;
          return value - 2;
        })
        .then(() => {
          // * Norm
          // @ts-ignore
          document.blabla();
          result = 0;
        })
        .catch(() => {
          catchIsCall = true;
        })
        .finally(() => {
          finallyIsCall = true;
        });

      expect(promise[Symbol.toStringTag]).toBe('SyncPromise');
      expect(result).toBe(150);
      expect(catchIsCall).toBe(true);
      expect(finallyIsCall).toBe(true);
    });

    test('SyncPromise.resolve', () => {
      let i = 0;
      let j = 0;

      SyncPromise.resolve(1)
        .then((val) => (i = val + 2))
        .then((val) => (i = val * 2));

      SyncPromise.resolve(SyncPromise.resolve(1))
        .then((val) => (j = val + 2))
        .then((val) => (j = val * 2));

      expect(i).toBe(6);
      expect(j).toBe(6);
    });

    test('SyncPromise.reject', () => {
      let i = 1;

      SyncPromise.reject('error').catch((err) => {
        expect(err).toBe('error');
        i += 2;
      });

      expect(i).toBe(3);
    });
  });

  describe('SyncPromise подробно', () => {
    test('Simple then', () => {
      let i = 1;

      new SyncPromise((resolve) => {
        resolve();
      })
        .then(() => i + 2)
        .then((val) => (i = val * 2));

      expect(i).toBe(6);
    });

    test('Unwrap promise', (done) => {
      let err: any;

      const sleep = new SyncPromise((r) => setTimeout(() => r(10), 30));

      try {
        sleep.unwrap();
      } catch (e) {
        err = e;
      }

      setTimeout(() => {
        expect(err).toBeInstanceOf(Error);
        expect(err?.message).toBe('Нельзя раскрыть не завершенный SyncPromise');
        expect(sleep.unwrap()).toBe(10);
        done();
      }, 50);
    });

    test('Unwraps rejected promise', () => {
      let err;

      try {
        SyncPromise.reject('error').unwrap();
      } catch (e) {
        err = e;
      }

      expect(err).toBe('error');
    });

    test('Promise that is resolved await another promise', async () => {
      const i = await new SyncPromise<number>((resolve) => {
        resolve(new Promise((r) => setTimeout(() => r(SyncPromise.resolve(1)), 50)));
      })
        .then((val) => new Promise<number>((r) => setTimeout(() => r(SyncPromise.resolve(val + 2)), 50)))
        .then((val) => val * 2);

      expect(i).toBe(6);
    });

    test('Promise that is rejected wtesth another promise', async () => {
      let i;

      try {
        await new SyncPromise<number>((resolve) => {
          resolve(new Promise((r) => setTimeout(() => r(SyncPromise.resolve(1)), 50)));
        })
          .then((val) => new Promise((r) => setTimeout(() => r(SyncPromise.reject(val + 2)), 50)))
          .catch((val) => Promise.reject(val * 2));
      } catch (err) {
        i = err;
      }

      expect(i).toBe(6);
    });

    test('Promise that is rejected await another promise by using a constructor', async () => {
      let i;

      try {
        await new SyncPromise((resolve, reject) => {
          reject(SyncPromise.resolve(1));
        });
      } catch (err) {
        i = err;
      }

      expect(i).toBeInstanceOf(SyncPromise);
      expect(await i).toBe(1);
    });

    // ! FIX setImmediate is not defined Jest
    // test('Double promise resolution', async () => {
    //   expect(
    //     await new SyncPromise((resolve) => {
    //       resolve(1);
    //       resolve(2);
    //     }),
    //   ).toBe(1);

    //   expect(
    //     await new SyncPromise((resolve) => {
    //       resolve(new Promise((r) => setTimeout(() => r(1), 100)));
    //       resolve(2);
    //     }),
    //   ).toBe(1);
    // });

    // test('Double promise rejection', async () => {
    //   try {
    //     await new SyncPromise((resolve, reject) => {
    //       reject(1);
    //       reject(2);
    //     });
    //   } catch (err) {
    //     expect(err).toBe(1);
    //   }

    //   try {
    //     await new SyncPromise((resolve, reject) => {
    //       reject(new Promise((r) => setTimeout(() => r(1), 100)));
    //       reject(2);
    //     });
    //   } catch (err) {
    //     expect(err).toBeInstanceOf(Promise);
    //     expect(await err).toBe(1);
    //   }
    // });

    test('Resolved then after catch', () => {
      let i = 1;

      new SyncPromise((resolve) => {
        resolve();
      })
        .catch(() => undefined)
        .then(() => i + 2)
        .then((val) => (i = val * 2));

      expect(i).toBe(6);
    });

    test('Rejected then', () => {
      let i = 1;

      new SyncPromise<number>((resolve, reject) => {
        reject('error');
      }).then(
        (val) => val * 2,
        (err) => {
          expect(err).toBe('error');
          i += 2;
        },
      );

      expect(i).toBe(3);
    });

    test('Dynamically rejected catch', () => {
      let i = 1;

      new SyncPromise((resolve) => {
        resolve();
      })
        .then(() => {
          throw 'error';
        })
        .then((val) => val * 2)
        .catch((err) => {
          expect(err).toBe('error');
          return (i += 2);
        })
        .then((val) => (i = val * 2));

      expect(i).toBe(6);
    });

    test('Catch', () => {
      let i = 1;

      new SyncPromise<number>((resolve, reject) => {
        reject('error');
      })
        .then((val) => val * 2)
        .catch((err) => {
          expect(err).toBe('error');
          i += 2;
        });

      expect(i).toBe(3);
    });

    test('Dynamically rejected catch', () => {
      let i = 1;

      new SyncPromise((resolve) => {
        resolve();
      })
        .then(() => {
          throw 'error';
        })
        .then((val) => val * 2)
        .catch((err) => {
          expect(err).toBe('error');
          return (i += 2);
        })
        .then((val) => (i = val * 2));

      expect(i).toBe(6);
    });

    test('Resolved finally', () => {
      let i = 1;

      new SyncPromise<void>((resolve) => {
        resolve();
      })
        .then(() => i + 2)
        // @ts-ignore
        .finally((arg) => {
          expect(arg).toBeUndefined();
          i *= 2;
        });
      expect(i).toBe(2);
    });

    test('Rejected finally', async () => {
      try {
        let i = 1;

        const promise = new SyncPromise((resolve, reject) => {
          reject('error');
          // @ts-ignore
        }).finally((arg) => {
          expect(arg).toBeUndefined();
          i *= 2;
        });

        expect(i).toBe(2);
        await promise;
      } catch (err) {
        expect(err).toBe('error');
      }
    });

    test('Dynamically rejected finally', () => {
      let i = 1;

      new SyncPromise((resolve) => {
        resolve();
      })
        .then(() => {
          throw 'error';
        })
        .then((val) => val * 2)
        .catch((err) => {
          expect(err).toBe('error');
          return i + 2;
        })
        // @ts-ignore
        .finally((arg) => {
          expect(arg).toBeUndefined();
          return (i *= 2);
        })
        .then((val) => {
          expect(val).toBe(3);
          return (i = val * 2);
        });
      expect(i).toBe(6);
    });

    test('Finally that returns error', () => {
      let reason;

      new SyncPromise((resolve) => {
        resolve(1);
      })
        .finally(() => SyncPromise.reject('error'))
        .catch((err) => {
          reason = err;
        });

      expect(reason).toBe('error');
    });

    test('finally that throws error', () => {
      let reason;

      new SyncPromise((resolve) => {
        resolve(1);
      })
        .finally(() => {
          throw 'error';
        })
        .catch((err) => {
          reason = err;
        });
      expect(reason).toBe('error');
    });
  });

  describe('SyncPromise.all', () => {
    test('All promises to be resolved', () => {
      let res;

      SyncPromise.all([1, null, SyncPromise.resolve(2)]).then((val) => (res = val));

      expect(res).toEqual([1, null, 2]);
    });

    test('Some promises to be rejected', () => {
      let res;

      SyncPromise.all([1, null, SyncPromise.reject(2)]).then(
        (val) => (res = val),
        (err) => (res = err),
      );

      expect(res).toBe(2);
    });
  });

  describe('SyncPromise.allSettled', () => {
    test('Some promises to be rejected', () => {
      let res;

      SyncPromise.allSettled([1, null, SyncPromise.reject(2)]).then(
        (val) => (res = val),
        (err) => (res = err),
      );

      expect(res).toEqual([
        {
          status: 'fulfilled',
          value: 1,
        },
        {
          status: 'fulfilled',
          value: null,
        },
        {
          status: 'rejected',
          reason: 2,
        },
      ]);
    });
  });

  describe('SyncPromise.race', () => {
    test('All promises to be resolved', () => {
      let res;

      SyncPromise.race([Promise.resolve(1), SyncPromise.resolve(2)]).then((val) => (res = val));

      expect(res).toBe(2);
    });

    test('Some promises to be rejected', () => {
      let res;

      SyncPromise.race([Promise.resolve(1), SyncPromise.reject(2)]).then(
        (val) => (res = val),
        (err) => (res = ['error', err]),
      );

      expect(res).toEqual(['error', 2]);
    });
  });
});
