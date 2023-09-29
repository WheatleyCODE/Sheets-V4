import { DeepPartial } from '@reduxjs/toolkit';
import { getModals } from './getModals';
import { IStateSchema } from 'app/providers/store-provider';

describe('getModals', () => {
  test('Return modals state', () => {
    const state: DeepPartial<IStateSchema> = {
      modals: { isAuth: false },
    };

    expect(getModals(state as IStateSchema)).toEqual({ isAuth: false });
  });
});
