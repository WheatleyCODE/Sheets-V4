import { AsyncIter, intoAsyncIter } from '../async-iter/asyncIter';

export const onStream = <T>(el: HTMLElement, event: any): AsyncIter<T> => {
  return intoAsyncIter<T>(on(el, event));
};

export async function* on<T = unknown, TReturn = any, TNext = unknown>(
  el: HTMLElement,
  event: any,
): AsyncGenerator<T, TReturn, TNext> {
  let cb: (val?: unknown) => void;
  let ev: any;

  el.addEventListener(event, (e: Event) => {
    if (cb != null) {
      cb(e);
      ev = e;
    }
  });

  while (true) {
    await new Promise((resolve) => {
      cb = resolve;
    });

    yield ev;
  }
}
