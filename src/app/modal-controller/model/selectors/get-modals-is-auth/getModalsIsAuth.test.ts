import { DeepPartial } from '@reduxjs/toolkit';
import { getModalsIsAuth } from './getModalsIsAuth';
import { IStateSchema } from 'app/providers/store-provider';

describe('getModalsIsAuth', () => {
  test('Return modals state isAuth', () => {
    const state: DeepPartial<IStateSchema> = {
      modals: { isAuth: false },
    };

    expect(getModalsIsAuth(state as IStateSchema)).toBe(false);
  });
});
