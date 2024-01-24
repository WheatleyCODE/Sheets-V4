import { opt } from '../../opt/opt';
import { or } from '../../or/or';
import { seq } from '../../seq/seq';
import { exponent } from './exponent';
import { intNumber, numberNotStartingWithZero, onlyZero, sign, zeroToFraction } from './math';
import { dotSymbol } from './symbols';
import {
  getValueFromToken,
  getValueFromTokensByIndex,
  reduceValuesByTokensWithTokens,
} from '../transformators/transformators';
import { TokenTypes } from '../../consts';
import type { ITokenWithTokens } from '../../interface';

const fraction = seq(
  {
    setValue: (v) => getValueFromTokensByIndex(v, 1),
  },
  dotSymbol,
  intNumber,
);

const numSign = opt(sign, {
  token: TokenTypes.NUMBER_SIGN,
  setValue: reduceValuesByTokensWithTokens,
});

const numInt = or(
  {
    token: TokenTypes.NUMBER_INT,
    setValue: getValueFromToken,
  },
  onlyZero,
  zeroToFraction,
  numberNotStartingWithZero,
);

const numFraction = opt(fraction, {
  token: TokenTypes.NUMBER_FRACTION,
  setValue: (v) => getValueFromTokensByIndex(v, 0),
});

const numExponent = opt(exponent, { token: TokenTypes.NUMBER_EXPONENT });

const filterNumOptional = (value: ITokenWithTokens[]) => {
  return [...value].filter((v) => {
    if (v.type === TokenTypes.NUMBER_SIGN && v.value.length === 0) return false;
    if (v.type === TokenTypes.NUMBER_FRACTION && v.value.length === 0) return false;
    if (v.type === TokenTypes.NUMBER_EXPONENT && v.value.length === 0) return false;

    return true;
  });
};

export const number = seq(
  {
    token: TokenTypes.NUMBER,
    setValue: filterNumOptional,
  },
  numSign,
  numInt,
  numFraction,
  numExponent,
);
