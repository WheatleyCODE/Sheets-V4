export enum TokenTypes {
  TAG = 'TAG',
  TAKE = 'TAKE',
  CHECK_NEXT = 'CHECK_NEXT',
  SEQ = 'SEQ',
  OR = 'OR',
  REPEAT = 'REPEAT',
  OPT = 'OPT',
}

export enum ParserStates {
  EXPECT_NEW_INPUT = 'EXPECT_NEW_INPUT',
}

export enum ParserSymbols {
  STRING_END = 'STRING_END',
  STRING_START = 'STRING_START',
}
