import { SyncPromise } from '../../promise';
import { ParserStates, TokenTypes } from '../consts';
import { intoIter } from '../helpers/into-iter/intoIter';
import type { IToken, Parser, ParserResult } from '../interface';
import type { ISeqOptions } from './seq.interface';

export function seq<T = unknown, R = unknown>(...parsers: Parser<any, any>[]): Parser<T | T[], R[]>;
export function seq<T = unknown, R = unknown>(opts: ISeqOptions, ...parsers: Parser<any, any>[]): Parser<T | T[], R[]>;
export function seq<T = unknown, R = unknown>(
  optsOrParser: ISeqOptions | Parser<any, any>,
  ...parsers: Parser<any, any>[]
): Parser<T, R> {
  let opts: ISeqOptions = {};

  if (typeof optsOrParser === 'function') {
    parsers.unshift(optsOrParser);
  } else {
    opts = optsOrParser;
  }

  return function* (source, prev) {
    const value: unknown[] = [];
    let sourceIter = intoIter(source);
    let data;
    let error;

    outer: for (const parser of parsers) {
      const parserIter = parser(sourceIter, prev);

      while (true) {
        const chunk = parserIter.next(data);

        chunk.value.catch((e) => (error = e));

        if (error) {
          break outer;
        }

        if (chunk.done) {
          const chunkValue = chunk.value.unwrap();
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

    if (error) {
      yield SyncPromise.reject(error);
    }

    if (opts.token) {
      const token: IToken = {
        type: TokenTypes.SEQ,
        value,
      };

      yield SyncPromise.resolve(token);
    }

    const token: IToken = {
      type: TokenTypes.SEQ,
      value,
    };

    const res: ParserResult = [token, sourceIter];

    return SyncPromise.resolve(res);
  } as Parser<T, R>;
}
