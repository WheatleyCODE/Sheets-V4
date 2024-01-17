import { SyncPromise } from '../promise';
import { ParserStates, TokenTypes } from './consts';

export type Test = string | RegExp | ((char: string) => boolean);

export interface IToken<T = unknown> {
  type: TokenTypes;
  value?: T;
}

interface IParserValue<T = unknown> extends IToken<T> {}

export type ParserResult<T = unknown> = [IParserValue<T>, Iterable<string>];

export type Parser<T = unknown, R = unknown> = (
  iterable: Iterable<string>,
  prev?: IParserValue<T>,
) => Generator<
  SyncPromise<ParserStates> | SyncPromise<IToken>,
  SyncPromise<ParserResult<R>>,
  Iterable<string> | undefined
>;

export interface IParserOptions<T = unknown> {
  token?: TokenTypes;
  setValue?: (v: unknown) => T;
}
