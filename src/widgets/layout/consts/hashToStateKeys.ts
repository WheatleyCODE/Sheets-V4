import { ModalsKeys } from '../model/types/modalsSchema';

export const hashToStateKeys: Record<string, ModalsKeys> = {
  '#auth': 'isAuth',
};

export enum ModalsHash {
  AUTH = '#auth',
}
