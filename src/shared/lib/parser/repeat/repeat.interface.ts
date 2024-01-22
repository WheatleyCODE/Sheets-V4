import type { ICombinatorOptions } from '../interface';

export interface IRepeatOptions<T = unknown> extends ICombinatorOptions<T> {
  min?: number;
  max?: number;
}
