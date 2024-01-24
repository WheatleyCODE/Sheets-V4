import { checkAfter } from '../../check-after/checkAfter';
import { ParserSymbols, TokenTypes } from '../../consts';
import { opt } from '../../opt/opt';
import { or } from '../../or/or';
import { seq } from '../../seq/seq';
import { tag } from '../../tag/tag';
import { take } from '../../take/take';

// ! Парсер для теста комбинаторов и парсер-функций
// * number - нормальный парсер чисел

const sign = tag([/[-+]/], { token: 'SING' as TokenTypes });
const intNumber = take(/[\d]/, { token: 'INT_NUMBER' as TokenTypes, isExpectNew: false });
const intOneNumberWithoutZero = tag([/[1-9]/], { token: 'INT_NUMBER' as TokenTypes, isExpectNew: false });
const exponentSymbol = tag([/e/i], { token: 'E' as TokenTypes });
const dotSymbol = tag('.', { token: 'DOT' as TokenTypes, isExpectNew: false });

const onlyZero = checkAfter(
  tag('0', { token: 'INT_NUMBER' as TokenTypes, isExpectNew: false }),
  ParserSymbols.STRING_END,
);

const zeroToFraction = checkAfter(
  tag('0', { token: 'INT_NUMBER' as TokenTypes, isExpectNew: false }),
  tag(['.', /\d/]),
);
const numberNotStartingWithZero = seq(intOneNumberWithoutZero, intNumber);

const exponent = seq(
  { token: 'EXPONENT' as TokenTypes },
  exponentSymbol,
  opt(sign),
  or(onlyZero, numberNotStartingWithZero),
);

const fraction = seq({ token: 'FRACTION' as TokenTypes }, dotSymbol, intNumber, opt(exponent));

export const sourceNumberParser = seq(
  { token: 'NUMBER' as TokenTypes },
  opt(sign),
  or(onlyZero, zeroToFraction, numberNotStartingWithZero),
  opt(fraction),
);
