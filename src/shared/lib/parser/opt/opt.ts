import { TokenTypes } from '../consts';
import { Parser } from '../interface';
import { repeat } from '../repeat/repeat';
import { IOptOptions } from './opt.interface';

export function opt<T = unknown, R = unknown>(parser: Parser<T, R>, opts?: IOptOptions<T[]>): Parser<T | T[], R[]> {
  return repeat(parser, { min: 0, max: 1, token: TokenTypes.OPT, ...opts });
}
