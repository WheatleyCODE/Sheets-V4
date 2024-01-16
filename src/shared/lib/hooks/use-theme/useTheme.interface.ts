import type { Theme } from '../../../../shared/lib/contexts/theme-context/ThemeContext.interface';
import { IKVStorageEngine } from '../../kv-storage/kv-storage/kvStorage.interface';
import { Nullable, SyncOrAsyncPromise } from '../../ts-utils';

export interface IUseThemeResult {
  setTheme: SetTheme;
  theme: Theme;
}

export type SetTheme = (newTheme: Theme, engine?: IKVStorageEngine) => SyncOrAsyncPromise<Nullable<void>>;
