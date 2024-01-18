import { SyncPromise } from '../../promise';
import { ParserStates, TokenTypes } from '../consts';
import { intoIter } from '../helpers/into-iter/intoIter';
import { testChar } from '../helpers/test-char/testChar';
import { ParserError } from '../parser-error/parserError';
import type { IToken, Parser, ParserResult, Test, IParserValue } from '../interface';
import type { ITagOptions } from './tag.interface';

export const tag = (pattern: Iterable<Test>, opts: ITagOptions<string> = {}): Parser<string, string> => {
  return function* (source: Iterable<string>, prev?: IParserValue<string>) {
    let sourceIter = intoIter(source);
    let value = '';

    for (const test of pattern) {
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
        return SyncPromise.reject(new ParserError(error, prev));
      }

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
      type: TokenTypes.TAG,
      value,
    };

    const res: ParserResult<string> = [token, sourceIter];

    return SyncPromise.resolve(res);
  };
};
