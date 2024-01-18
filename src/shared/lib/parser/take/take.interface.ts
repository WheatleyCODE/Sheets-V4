import { IParserOptions } from '../interface';

export interface ITakeOptions<T = unknown> extends IParserOptions<T> {
  min?: number;
  max?: number;
}
