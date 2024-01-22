import { SyncPromise } from '../promise';
import { ParserStates, TokenTypes } from './consts';
import { ParserError } from './parser-error/parserError';

export type Test = string | RegExp | ((char: string) => boolean);

export interface IToken<T = unknown> {
  type: TokenTypes;
  value?: T;
}

export interface IParserValue<T = unknown> extends IToken<T> {}

export type ParserResult<T = unknown> = [IParserValue<T>, Iterable<string>];

export type Parser<T = unknown, R = unknown> = (
  iterable: Iterable<string>,
  prev?: IParserValue,
) => Generator<
  SyncPromise<ParserStates | IToken<T>> | SyncPromise<ParserError>,
  SyncPromise<ParserResult<R>> | SyncPromise<ParserError>,
  Iterable<string> | undefined
>;

export interface ICombinatorOptions<T = unknown> {
  token?: TokenTypes;
  setValue?: (v: unknown) => T;
}

export interface IParserOptions<T = unknown> extends ICombinatorOptions<T> {
  isExpectNew?: boolean;
}
