import { SyncPromise } from '../../promise';
import { ParserStates, TokenTypes } from '../consts';
import { intoBufferIter } from '../helpers/into-buffer-iter/intoBufferIter';
import { intoIter } from '../helpers/into-iter/intoIter';
import { seqIterable } from '../helpers/seq-iterable/seq-iterable';
import { ParserError } from '../parser-error/parserError';
import type { IToken, Parser, ParserResult } from '../interface';
import type { IOrOptions } from './or.interface';

export function or<T = unknown, R = unknown>(...parsers: Parser<any, any>[]): Parser<T, R>;
export function or<T = unknown, R = unknown>(opts: IOrOptions, ...parsers: Parser<any, any>[]): Parser<T, R>;
export function or<T = unknown, R = unknown>(
  optsOrParser: IOrOptions | Parser<any, any>,
  ...parsers: Parser<any, any>[]
): Parser<T, R> {
  let opts: IOrOptions = {};

  if (typeof optsOrParser === 'function') {
    parsers.unshift(optsOrParser);
  } else {
    opts = optsOrParser;
  }

  return function* (source, prev) {
    const yields: SyncPromise<IToken>[] = [];

    let value;
    let done = false;
    let sourceIter = intoIter(source);
    let data;

    outer: for (const parser of parsers) {
      const buffer: any[] = [];
      const parserIter = parser(intoBufferIter(sourceIter, buffer), prev);

      while (true) {
        const chunk = parserIter.next(data);
        let error;

        chunk.value.catch((e) => (error = e));

        if (!error) {
          if (chunk.done) {
            done = true;
            const chunkValue = chunk.value.unwrap() as ParserResult<any>;
            value = chunkValue[0];
            sourceIter = intoIter(chunkValue[1]);

            break outer;
          } else {
            const chunkValue = chunk.value.unwrap();

            if (chunkValue === ParserStates.EXPECT_NEW_INPUT) {
              data = yield chunk.value;
            } else {
              yields.push(<any>SyncPromise.resolve(chunkValue));
            }
          }
        } else {
          sourceIter = buffer.length > 0 ? seqIterable(buffer, sourceIter) : sourceIter;
          yields.splice(0, yields.length);
          break;
        }
      }
    }

    if (!done) {
      yield SyncPromise.reject(new ParserError('Не один кейс не был выполнен', prev));
      return SyncPromise.reject(new ParserError('Не один кейс не был выполнен', prev));
    }

    yield* yields;

    let token: IToken = {
      type: TokenTypes.OR,
      value,
    };

    if (opts.token || opts.setValue) {
      token = {
        type: opts.token ? opts.token : TokenTypes.OR,
        value: opts?.setValue ? opts?.setValue(value) : value,
      };
    }

    const res: ParserResult = [token, sourceIter];

    yield SyncPromise.resolve(token);
    return SyncPromise.resolve(res);
  } as Parser<T, R>;
}
