import type { IModalsSchema, ModalsKeys } from '../types/modal/modal.interface';
import type { IScrollSchema } from '../types/scroll/scroll.interface';

export const hashToStateKeys: Record<string, ModalsKeys> = {
  '#auth': 'isAuth',
};

export enum ModalsHash {
  AUTH = '#auth',
}

export const initialScrollState: IScrollSchema = {
  scroll: {},
};

export const initialModalState: IModalsSchema = {
  isAuth: false,
};
