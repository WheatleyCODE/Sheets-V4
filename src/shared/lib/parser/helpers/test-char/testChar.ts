import type { IParserValue, Test } from '../../interface';

export function testChar(test: Test, char: string, prev?: IParserValue): string | null {
  switch (typeof test) {
    case 'string':
      if (test !== char) {
        return `Некорректная строка: ${char}. test: ${test}. Тип test string. test не равен char. prev: ${prev}`;
      }
      break;
    case 'function':
      if (!test(char)) {
        return `Некорректная строка: ${char}. test: ${test}. Тип test function. test(char) равен false. prev: ${prev}`;
      }
      break;
    default:
      if (!test.test(char)) {
        return `Некорректная строка: ${char}. test: ${test}. Тип test RegExp. test.test(char) равен false. prev: ${prev}`;
      }
  }

  return null;
}
