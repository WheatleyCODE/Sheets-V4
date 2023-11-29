import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useLoginError, getLoginError] = buildSelector(getDefaultSelectorBy('login', 'error', null));
