import type { IParserValue } from '../interface';

export class ParserError extends Error {
  prev?: IParserValue;

  constructor(message: string, prev?: IParserValue) {
    super(message);
    this.prev = prev;
  }
}
