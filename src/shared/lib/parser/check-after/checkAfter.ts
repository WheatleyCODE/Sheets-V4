import { SyncPromise } from '../../promise';
import { intoIter } from '../helpers/into-iter/intoIter';
import { ParserError } from '../parser-error/parserError';
import { ParserStates, ParserSymbols, TokenTypes } from '../consts';
import { testChar } from '../helpers/test-char/testChar';
import { intoBufferIter } from '../helpers/into-buffer-iter/intoBufferIter';
import { seqIterable } from '../helpers/seq-iterable/seq-iterable';
import type { ICombinatorOptions, IToken, Parser, ParserResult, Test } from '../interface';

export interface ICheckNextOptions extends ICombinatorOptions {}

export function checkAfter<T = unknown, R = unknown>(
  parser: Parser<any, any>,
  test: Test | ParserSymbols.STRING_END,
  opts: ICheckNextOptions = {},
): Parser<T, R> {
  return function* (source, prev) {
    let error;
    let value;
    let sourceIter = intoIter(source);

    const parserIter = parser(sourceIter, prev);

    while (true) {
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

        const afterChunk = sourceIter.next();
        const afterChar = afterChunk.value;

        if (afterChunk.done && test === ParserSymbols.STRING_END) {
          sourceIter = buffer.length > 0 ? seqIterable(buffer, sourceIter) : sourceIter;
          break;
        }

        if (afterChunk.done) {
          const newSource = yield SyncPromise.resolve(ParserStates.EXPECT_NEW_INPUT);

          if (newSource == null) {
            yield SyncPromise.reject(new ParserError('Ожидается продолжение (yield)', prev));
            return SyncPromise.reject(new ParserError('Ожидается продолжение (return)', prev));
          }

          const newChunk = intoIter(newSource).next();
          const newChar = newChunk.value;

          if (newChunk.done) {
            yield SyncPromise.reject(new ParserError('Ожидается символ впереди (yield)', prev));
            return SyncPromise.reject(new ParserError('Ожидается символ впереди (return)', prev));
          }

          if (testChar(test, newChar, prev) != null) {
            yield SyncPromise.reject(new ParserError('Не выполнено условие взгляда вперед (yield)', prev));
            return SyncPromise.reject(new ParserError('Не выполнено условие взгляда вперед (return)', prev));
          }
        }

        if (testChar(test, afterChar, prev) != null) {
          yield SyncPromise.reject(new ParserError('Не выполнено условие взгляда вперед (yield)', prev));
          return SyncPromise.reject(new ParserError('Не выполнено условие взгляда вперед (return)', prev));
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
