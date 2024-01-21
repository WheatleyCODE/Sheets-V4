import { SyncPromise } from '../../promise';
import { ParserStates, TokenTypes } from '../consts';
import { intoBufferIter } from '../helpers/into-buffer-iter/intoBufferIter';
import { intoIter } from '../helpers/into-iter/intoIter';
import { seqIterable } from '../helpers/seq-iterable/seq-iterable';
import type { IToken, Parser, ParserResult } from '../interface';
import { ParserError } from '../parser-error/parserError';
import type { IRepeatOptions } from './repeat.interface';

export function repeat<T = unknown, R = unknown>(
  parser: Parser<T, R>,
  opts: IRepeatOptions<T[]> = {},
): Parser<T | T[], R[]> {
  return function* (source, prev) {
    const { min = 1, max = Infinity } = opts;

    const value: T[] = [];
    const yields: SyncPromise<IToken<T | T[]>>[] = [];

    let sourceIter = intoIter(source);
    let count = 0;
    let data;

    const globalBuffer: string[] = [];

    outer: while (true) {
      const buffer: string[] = count >= min ? [] : globalBuffer;
      const parserIter = parser(intoBufferIter(sourceIter, buffer), prev);

      while (true) {
        if (count >= max) {
          yield* yields;
          break outer;
        }

        const chunk = parserIter.next(data);
        let error;

        chunk.value.catch((e) => (error = e));

        if (!error) {
          if (chunk.done) {
            const chunkValue = chunk.value.unwrap();
            prev = chunkValue[0];
            sourceIter = intoIter(chunkValue[1]);
            value.push(<any>prev);
            count++;

            if (count >= min) {
              yield* yields;
              yields.splice(0, yields.length);
            }

            break;
          } else {
            const chunkValue = chunk.value.unwrap();

            if (chunkValue === ParserStates.EXPECT_NEW_INPUT) {
              data = yield chunk.value;

              // if (data == null) {
              //   yield SyncPromise.reject(new ParserError('Ожидается продолжение', prev));
              //   return;
              //   // console.log(chunk.value.unwrap());
              // }

              if (data) {
                sourceIter = intoIter(data);
              }
            } else {
              yields.push(<any>SyncPromise.resolve(chunkValue));
            }
          }
        } else {
          if (count < min) {
            yield SyncPromise.reject(error);
            return;
          }

          sourceIter = buffer.length > 0 ? seqIterable(buffer, sourceIter) : sourceIter;
          break outer;
        }
      }
    }

    if (opts.token && count > 0) {
      const token: IToken = {
        type: TokenTypes.SEQ,
        value,
      };

      yield SyncPromise.resolve(token);
    }

    const token: IToken = {
      type: TokenTypes.REPEAT,
      value,
    };

    const res: ParserResult = [token, sourceIter];

    return SyncPromise.resolve(res);
  } as Parser<T | T[], R[]>;
}
