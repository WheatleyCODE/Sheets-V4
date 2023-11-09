export { Layout } from './ui/layout/Layout';
export { ModalController } from './ui/modal-controller/ModalController';
export type { IModalsSchema, ModalsKeys } from './model/types/modal/modal.interface';
export { ModalsHash } from './model/consts/layout.consts';
export { modalsActions, modalsReducer, modalsSlice } from './model/slice/modal/modalsSlice';

export { scrollActions, scrollReducer } from './model/slice/scroll/scrollSlice';
export type { IScrollSchema } from './model/types/scroll/scroll.interface';
