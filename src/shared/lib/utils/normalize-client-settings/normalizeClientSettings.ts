import { IClientSettings } from '@/shared/types';
import { intoIter } from '../../iterators';

export const normalizeClientSettings = (clientSettings: IClientSettings): IClientSettings => {
  const newSettings: IClientSettings = {};
  const iter = intoIter<keyof IClientSettings>(clientSettings, 'keys');

  for (const key of iter) {
    const value = clientSettings[key];

    if (value && value.startsWith('"')) {
      newSettings[key] = JSON.parse(value);
    } else {
      newSettings[key] = value;
    }
  }

  return newSettings;
};
