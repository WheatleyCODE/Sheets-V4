import { SyncPromise } from '../../promise';
import { ParserStates, TokenTypes } from '../consts';
import { intoIter } from '../helpers/into-iter/intoIter';
import { seqIterable } from '../helpers/seq-iterable/seq-iterable';
import { testChar } from '../helpers/test-char/testChar';
import { ParserError } from '../parser-error/parserError';
import type { IToken, Parser, ParserResult, Test } from '../interface';
import type { ITakeOptions } from './take.interface';

export const take = (test: Test, opts: ITakeOptions<string> = {}): Parser<string, string> => {
  const { max = Infinity, min = 1, isExpectNew = true } = opts;

  return function* (source, prev) {
    let sourceIter = intoIter(source);
    let count = 0;
    let value = '';

    const buffer: string[] = [];

    while (true) {
      if (count >= max) {
        break;
      }

      let chunk = sourceIter.next();
      let char = chunk.value;

      if (chunk.done && isExpectNew) {
        const newSource = yield SyncPromise.resolve(ParserStates.EXPECT_NEW_INPUT);

        if (newSource == null && count < min) {
          yield SyncPromise.reject(new ParserError('Ожидается продолжение (yield)', prev));
          return SyncPromise.reject(new ParserError('Ожидается продолжение (return)', prev));
        }

        if (newSource) {
          sourceIter = intoIter(newSource);
          chunk = sourceIter.next();
          char = chunk.value;
        }
      }

      // * Первый запуск take isExpectNew = false
      if (!char && !isExpectNew && count === 0) {
        const newSource = yield SyncPromise.resolve(ParserStates.EXPECT_NEW_INPUT);

        if (newSource == null) {
          yield SyncPromise.reject(new ParserError('Ожидается продолжение (yield)', prev));
          return SyncPromise.reject(new ParserError('Ожидается продолжение (return)', prev));
        }

        sourceIter = intoIter(newSource);
        chunk = sourceIter.next();
        char = chunk.value;
      }

      if (!char) {
        // * Если chunk = { value: undefined, done: true } и isExpectNew = false и это не первый запуск
        break;
      }

      const error = testChar(test, char, prev);

      if (error != null) {
        if (count < min) {
          yield SyncPromise.reject(new ParserError('Не выполнено условие count < min (yield) ' + error, prev));
          return SyncPromise.reject(new ParserError('Не выполнено условие count < min (return) ' + error, prev));
        }

        buffer.push(char);
        break;
      }

      count++;
      value += char;
    }

    let token: IToken<string> = {
      type: TokenTypes.TAKE,
      value,
    };

    if (opts.token && count > 0) {
      token = {
        type: opts.token,
        value: opts?.setValue ? opts?.setValue(value) : value,
      };
    }

    const res: ParserResult<string> = [token, buffer.length > 0 ? seqIterable(buffer, sourceIter) : sourceIter];

    yield SyncPromise.resolve(token);
    return SyncPromise.resolve(res);
  } as Parser<string, string>;
};
