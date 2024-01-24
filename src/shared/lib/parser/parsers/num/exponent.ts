import { opt } from '../../opt/opt';
import { or } from '../../or/or';
import { seq } from '../../seq/seq';
import { numberNotStartingWithZero, onlyZero, sign } from './math';
import { exponentSymbol } from './symbols';
import { TokenTypes } from '../../consts';
import { getValueFromToken, reduceValuesByTokensWithTokens } from './transformators';
import type { ITokenWithTokens } from '../../interface';

const filterExponentOptional = (value: ITokenWithTokens[]) => {
  return [...value].filter((v) => {
    if (v.type === TokenTypes.EXPONENT_SIGN && v.value.length === 0) return false;

    return true;
  });
};

const exponentSign = opt(sign, {
  token: TokenTypes.EXPONENT_SIGN,
  setValue: reduceValuesByTokensWithTokens,
});

const exponentInt = or(
  {
    token: TokenTypes.EXPONENT_INT,
    setValue: getValueFromToken,
  },
  onlyZero,
  numberNotStartingWithZero,
);

export const exponent = seq(
  {
    token: TokenTypes.EXPONENT,
    setValue: filterExponentOptional,
  },
  exponentSymbol,
  exponentSign,
  exponentInt,
);
