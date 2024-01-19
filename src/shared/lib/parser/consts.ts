export enum TokenTypes {
  TAG = 'TAG',
  TAKE = 'TAKE',

  SEQ = 'SEQ',
  OR = 'OR',
  REPEAT = 'REPEAT',

  XML = 'XML',
  NUMBER = 'NUMBER',
}

export enum ParserStates {
  EXPECT_NEW_INPUT = 'EXPECT_NEW_INPUT',
}
