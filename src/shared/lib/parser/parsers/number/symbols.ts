import { TokenTypes } from '../../consts';
import { tag } from '../../tag/tag';

export const dotSymbol = tag('.', { token: TokenTypes.DOT });
export const exponentSymbol = tag([/e/i], { token: TokenTypes.EXPONENT_SYMBOL });
