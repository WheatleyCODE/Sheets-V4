import { SyncPromise } from '../../promise';
import { ParserStates, TokenTypes } from '../consts';
import { intoIter } from '../helpers/into-iter/intoIter';
import type { IToken, Parser, ParserResult } from '../interface';
import type { ISeqOptions } from './seq.interface';

export function seq<T = unknown, R = unknown>(...parsers: Parser<any, any>[]): Parser<T | T[], R[]>;
export function seq<T = unknown, R = unknown>(opts: ISeqOptions, ...parsers: Parser<any, any>[]): Parser<T | T[], R[]>;
export function seq<T = unknown, R = unknown>(
  seqOpts: ISeqOptions | Parser<any, any>,
  ...parsers: Parser<any, any>[]
): Parser<T, R> {
  let opts: ISeqOptions = {};

  if (typeof seqOpts === 'function') {
    parsers.unshift(seqOpts);
  } else {
    opts = seqOpts;
  }

  return function* (source, prev) {
    const value: unknown[] = [];
    let sourceIter = intoIter(source);
    let data;
    let error;

    for (const parser of parsers) {
      const parserIter = parser(sourceIter, prev);

      while (true) {
        const chunk = parserIter.next(data);

        chunk.value.catch((e) => (error = e));

        if (error) {
          yield SyncPromise.reject(error);
          return SyncPromise.reject(error);
        }

        if (chunk.done) {
          const chunkValue = chunk.value.unwrap() as ParserResult<any>;
          prev = chunkValue[0];

          value.push(prev);
          sourceIter = intoIter(chunkValue[1]);

          break;
        } else {
          const chunkValue = chunk.value.unwrap();

          if (chunkValue === ParserStates.EXPECT_NEW_INPUT) {
            data = yield chunk.value;
          } else {
            yield chunk.value;
          }
        }
      }
    }

    let token: IToken = {
      type: TokenTypes.SEQ,
      value,
    };

    if (opts.token) {
      token = {
        type: opts.token,
        value: opts?.setValue ? opts?.setValue(value) : value,
      };
    }

    const res: ParserResult = [token, sourceIter];

    yield SyncPromise.resolve(token);
    return SyncPromise.resolve(res);
  } as Parser<T, R>;
}
