import { SyncPromise } from '../../promise';
import { ParserStates, TokenTypes } from '../consts';
import { intoIter } from '../helpers/into-iter/intoIter';
import { seqIterable } from '../helpers/seq-iterable/seq-iterable';
import { testChar } from '../helpers/test-char/testChar';
import type { IToken, Parser, ParserResult, Test } from '../interface';
import { ParserError } from '../parser-error/parserError';
import { ITakeOptions } from './take.interface';

export const take = (test: Test, opts: ITakeOptions<string> = {}): Parser<string, string> => {
  const { max = Infinity, min = 1 } = opts;

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

      if (chunk.done) {
        const newSource = yield SyncPromise.resolve(ParserStates.EXPECT_NEW_INPUT);

        if (newSource == null) {
          return SyncPromise.reject(new ParserError('Ожидается продолжение', prev));
        }

        sourceIter = intoIter(newSource);
        chunk = sourceIter.next();
        char = chunk.value;
      }

      const error = testChar(test, char, prev);

      if (error != null) {
        // * Ошибка только в случае count < min ???
        if (count < min) {
          return SyncPromise.reject(
            new ParserError(`Не выполнено условие count < min: ${count} < ${min}. ` + error, prev),
          );
        }

        buffer.push(char);

        break;
      }

      count++;
      value += char;
    }

    if (opts.token) {
      const token: IToken = {
        type: opts.token,
        value: opts?.setValue ? opts?.setValue(value) : value,
      };

      yield SyncPromise.resolve(token);
    }

    const token: IToken<string> = {
      type: TokenTypes.TAKE,
      value,
    };

    const res: ParserResult<string> = [token, buffer.length > 0 ? seqIterable(buffer, sourceIter) : sourceIter];

    return SyncPromise.resolve(res);
  };
};
