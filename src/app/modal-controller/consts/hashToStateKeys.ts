import { ModalsKeys } from '../types/counterSchema';

export const hashToStateKeys: Record<string, ModalsKeys> = {
  '#auth': 'isAuth',
};

export enum ModalsHash {
  AUTH = '#auth',
}
