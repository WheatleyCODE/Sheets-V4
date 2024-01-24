import { tag } from '../../tag/tag';
import { ParserSymbols, TokenTypes } from '../../consts';
import { take } from '../../take/take';
import { checkAfter } from '../../check-after/checkAfter';
import { seq } from '../../seq/seq';
import { getValueFromToken, reduceValuesByTokensWithTokens } from './transformators';

export const sign = tag([/[-+]/], { token: TokenTypes.SIGN });

export const intNumber = take(/[\d]/, { token: TokenTypes.INT });
export const intOneNumberWithoutZero = tag([/[1-9]/], { token: TokenTypes.INT });

export const onlyZero = checkAfter(tag('0'), ParserSymbols.STRING_END, {
  token: TokenTypes.INT,
  setValue: getValueFromToken,
});

export const zeroToFraction = checkAfter(tag('0'), tag(['.', /\d/]), {
  token: TokenTypes.INT,
  setValue: getValueFromToken,
});

export const numberNotStartingWithZero = seq(
  {
    token: TokenTypes.INT,
    setValue: reduceValuesByTokensWithTokens,
  },
  intOneNumberWithoutZero,
  intNumber,
);
