import { SyncPromise } from '../../promise';
import { intoIter } from '../helpers/into-iter/intoIter';
import { ParserError } from '../parser-error/parserError';
import { ParserStates, ParserSymbols, TokenTypes } from '../consts';
import { intoBufferIter } from '../helpers/into-buffer-iter/intoBufferIter';
import { seqIterable } from '../helpers/seq-iterable/seq-iterable';
import { tag } from '../tag/tag';
import type { ICheckAfterOptions } from './checkAfter.interface';
import type { IToken, Parser, ParserResult } from '../interface';

export function checkAfter<T = unknown, R = unknown>(
  parser: Parser<any, any>,
  check: Parser<any, any> | ParserSymbols.STRING_END,
  opts: ICheckAfterOptions = {},
): Parser<T, R> {
  return function* (source, prev) {
    let error;
    let value;
    let sourceIter = intoIter(source);

    const parserIter = parser(sourceIter, prev);

    outer: while (true) {
      const chunk = parserIter.next();
      chunk.value.catch((e) => (error = e));

      if (error) {
        yield SyncPromise.reject(error);
        return SyncPromise.reject(error);
      }

      if (chunk.done) {
        const chunkValue = chunk.value.unwrap() as ParserResult<any>;
        value = chunkValue[0];

        const buffer: string[] = [];
        sourceIter = intoBufferIter(chunkValue[1], buffer);

        const afterIter = check === ParserSymbols.STRING_END ? tag([/[\w|\W]/])(sourceIter) : check(sourceIter);
        let afterError;
        let count = 0;
        let data;

        while (true) {
          const chunk = afterIter.next(data);

          chunk.value.catch((e) => (afterError = e));

          if (afterError) {
            yield SyncPromise.reject(new ParserError('Не выполнено условие взгляда вперед (yield)', prev));
            return SyncPromise.reject(new ParserError('Не выполнено условие взгляда вперед (return)', prev));
          }

          if (check === ParserSymbols.STRING_END && count > 0) {
            yield SyncPromise.reject(new ParserError('Не выполнено условие взгляда вперед (yield)', prev));
            return SyncPromise.reject(new ParserError('Не выполнено условие взгляда вперед (return)', prev));
          }

          if (chunk.value.unwrap() === ParserStates.EXPECT_NEW_INPUT) {
            if (check === ParserSymbols.STRING_END && count === 0) {
              sourceIter = buffer.length > 0 ? seqIterable(buffer, sourceIter) : sourceIter;
              break outer;
            }

            const newSource = yield SyncPromise.resolve(ParserStates.EXPECT_NEW_INPUT);

            if (newSource == null) {
              yield SyncPromise.reject(new ParserError('Ожидается продолжение (yield)', prev));
              return SyncPromise.reject(new ParserError('Ожидается продолжение (return)', prev));
            }

            data = newSource;
          }

          if (chunk.done) {
            break;
          }

          count++;
        }

        sourceIter = buffer.length > 0 ? seqIterable(buffer, sourceIter) : sourceIter;
        break;
      }
    }

    let token: IToken = {
      type: TokenTypes.CHECK_NEXT,
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
