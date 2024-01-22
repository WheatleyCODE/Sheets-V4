/* eslint-disable prettier/prettier */
import { TokenTypes } from '../../consts';
import { opt } from '../../opt/opt';
import { or } from '../../or/or';
import { seq } from '../../seq/seq';
import { tag } from '../../tag/tag';
import { take } from '../../take/take';

const sign = tag([/[-+]/], { token: 'SING' as TokenTypes })
const intNumber = take(/[\d]/, { token: 'INT_NUMBER' as TokenTypes, isExpectNew: false })
const intNumberWithoutZero = take(/[1-9]/, { token: 'INT_NUMBER' as TokenTypes, isExpectNew: false })
const zero = tag('0', { token: 'INT_NUMBER' as TokenTypes, isExpectNew: false })
const onlyZero = tag([/^0$/], { token: 'ONLY_ZERO' as TokenTypes, isExpectNew: false })

const exponent = seq(
  { token: 'EXPONENT' as TokenTypes },
  tag([/e/i], { token: 'E' as TokenTypes }),
  sign,
  intNumber // Врятли exp может быть 0544545
)

const fraction = seq(
  { token: 'FRACTION ' as TokenTypes },
  tag('.', { token: 'DOT' as TokenTypes, isExpectNew: false }),
  intNumber,
  opt(exponent)
);

const zeroToFraction = seq(
  { token: 'ZERO_TO_FRACTION' as TokenTypes },
  zero,
  fraction,
)

const numberToFraction = seq(
  { token: 'NUMBER_TO_FRACTION' as TokenTypes },
  intNumberWithoutZero,
  fraction,
)

export const number = seq(
  { token: 'NUMBER' as TokenTypes },
  opt(sign),
  or(numberToFraction, zeroToFraction, intNumberWithoutZero),
);
