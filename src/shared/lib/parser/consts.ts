export enum TokenTypes {
  // Factories
  TAG = 'TAG',
  TAKE = 'TAKE',

  // Combinators
  CHECK_NEXT = 'CHECK_NEXT',
  SEQ = 'SEQ',
  OR = 'OR',
  REPEAT = 'REPEAT',
  OPT = 'OPT',

  // Math
  SIGN = 'SIGN',
  INT = 'INT',

  // Number
  NUMBER = 'NUMBER',
  NUMBER_SIGN = 'NUMBER_SIGN',
  NUMBER_INT = 'NUMBER_INT',
  NUMBER_FRACTION = 'NUMBER_FRACTION',
  NUMBER_EXPONENT = 'NUMBER_EXPONENT',

  // Exponent
  EXPONENT = 'EXPONENT',
  EXPONENT_SIGN = 'EXPONENT_SIGN',
  EXPONENT_INT = 'EXPONENT_INT',

  // Symbols
  DOT = 'DOT',
  EXPONENT_SYMBOL = 'EXPONENT_SYMBOL',
}

export enum ParserStates {
  EXPECT_NEW_INPUT = 'EXPECT_NEW_INPUT',
}

export enum ParserSymbols {
  STRING_END = 'STRING_END',
  STRING_START = 'STRING_START',
}
