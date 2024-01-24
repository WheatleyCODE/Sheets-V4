import { SyncPromise } from '../../promise';
import { ParserStates, TokenTypes } from '../consts';
import { intoIter } from '../helpers/into-iter/intoIter';
import { testChar } from '../helpers/test-char/testChar';
import { ParserError } from '../parser-error/parserError';
import type { IToken, Parser, ParserResult, Test } from '../interface';
import type { ITagOptions } from './tag.interface';

export const tag = (pattern: Iterable<Test>, opts: ITagOptions<string> = {}): Parser<string, string> => {
  const { isExpectNew = true } = opts;

  return function* (source, prev) {
    let sourceIter = intoIter(source);
    let value = '';

    for (const test of pattern) {
      let chunk = sourceIter.next();
      let char = chunk.value;

      if (chunk.done && isExpectNew) {
        const newSource = yield SyncPromise.resolve(ParserStates.EXPECT_NEW_INPUT);

        if (newSource == null) {
          yield SyncPromise.reject(new ParserError('Ожидается продолжение (yield)', prev));
          return SyncPromise.reject(new ParserError('Ожидается продолжение (return)', prev));
        }

        sourceIter = intoIter(newSource);
        chunk = sourceIter.next();
        char = chunk.value;
      }

      const error = testChar(test, char, prev);

      if (error != null) {
        yield SyncPromise.reject(new ParserError(error, prev));
        return SyncPromise.reject(new ParserError(error, prev));
      }

      value += char;
    }

    let token: IToken<string> = {
      type: TokenTypes.TAG,
      value,
    };

    if (opts.token || opts.setValue) {
      token = {
        type: opts.token ? opts.token : TokenTypes.TAG,
        value: opts?.setValue ? opts?.setValue(value) : value,
      };
    }

    const res: ParserResult<string> = [token, sourceIter];

    yield SyncPromise.resolve(token);
    return SyncPromise.resolve(res);
  } as Parser<string, string>;
};
