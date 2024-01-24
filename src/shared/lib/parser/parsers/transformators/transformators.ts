import { IToken, ITokenWithTokens } from '../../interface';

export const getValueFromToken = (token: IToken) => token.value;

export const getValueFromTokensByIndex = (tokens: IToken[], index: number) => {
  if (tokens.length && index <= tokens.length - 1) {
    return tokens[index].value;
  }

  return tokens;
};

export const reduceValuesByTokensWithTokens = (tokensWithTokens: ITokenWithTokens[]) => {
  return tokensWithTokens.reduce((acc, v) => acc + v.value, '');
};
