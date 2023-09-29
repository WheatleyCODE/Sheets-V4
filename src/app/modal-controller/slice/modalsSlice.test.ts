import { modalsReducer, modalActions } from './modalsSlice';
import { IModalsSchema } from '../types/counterSchema';

describe('modalsSlice', () => {
  test('Open auth modal', () => {
    const state: IModalsSchema = {
      isAuth: false,
    };

    expect(modalsReducer(state, modalActions.openModalByKey('isAuth'))).toEqual({
      isAuth: true,
    });
  });

  test('Close auth modal', () => {
    const state: IModalsSchema = {
      isAuth: true,
    };

    expect(modalsReducer(state, modalActions.closeModalByKey('isAuth'))).toEqual({
      isAuth: false,
    });
  });

  test('Toggle auth modal', () => {
    const state: IModalsSchema = {
      isAuth: true,
    };

    expect(modalsReducer(state, modalActions.toggleModalByKey('isAuth'))).toEqual({
      isAuth: false,
    });
  });

  test('Toggle auth modal', () => {
    const state: IModalsSchema = {
      isAuth: false,
    };

    expect(modalsReducer(state, modalActions.toggleModalByKey('isAuth'))).toEqual({
      isAuth: true,
    });
  });
});
