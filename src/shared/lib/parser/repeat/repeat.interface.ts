import type { IParserOptions } from '../interface';

export interface IRepeatOptions<T = unknown> extends IParserOptions<T> {
  min?: number;
  max?: number;
}
