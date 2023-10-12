import { modalsReducer, modalsActions } from './modalsSlice';
import { IModalsSchema } from '../types/modalsSchema';

describe('modalsSlice', () => {
  test('Open auth modal', () => {
    const state: IModalsSchema = {
      isAuth: false,
    };

    expect(modalsReducer(state, modalsActions.openModalByKey('isAuth'))).toEqual({
      isAuth: true,
    });
  });

  test('Close auth modal', () => {
    const state: IModalsSchema = {
      isAuth: true,
    };

    expect(modalsReducer(state, modalsActions.closeModalByKey('isAuth'))).toEqual({
      isAuth: false,
    });
  });

  test('Toggle auth modal', () => {
    const state: IModalsSchema = {
      isAuth: true,
    };

    expect(modalsReducer(state, modalsActions.toggleModalByKey('isAuth'))).toEqual({
      isAuth: false,
    });
  });

  test('Toggle auth modal', () => {
    const state: IModalsSchema = {
      isAuth: false,
    };

    expect(modalsReducer(state, modalsActions.toggleModalByKey('isAuth'))).toEqual({
      isAuth: true,
    });
  });
});
