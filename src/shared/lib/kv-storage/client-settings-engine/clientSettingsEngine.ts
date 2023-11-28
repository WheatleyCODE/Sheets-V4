import { api } from '@/shared/api/axios/axios';
import { Nullable } from '../../ts-utils';
import { IClientSettings } from '@/shared/types';
import type { KVStorageEngine } from '../kv-storage/kvStorage.interface';

// eslint-disable-next-line wheatley-code/layer-imports
import { IUser } from '@/entities/user';

export class ClientSettingsEngine implements KVStorageEngine {
  #userId: string;

  constructor(userId: string) {
    this.#userId = userId;
  }

  get(key: keyof IClientSettings): Promise<Nullable<string>> {
    return api.get<IUser>(`/users/${this.#userId}`).then((res) => {
      console.log(res.data?.clientSettings?.[key]);

      return res.data?.clientSettings?.[key];
    });
  }

  set(key: string, value: string): Promise<void> {
    console.log('work');
    return api.patch(`/users/${this.#userId}`, { clientSettings: { [key]: value } });
  }

  remove(key: string): Promise<void> {
    return api.patch(`/users/${this.#userId}`, { clientSettings: { [key]: undefined } });
  }
}
