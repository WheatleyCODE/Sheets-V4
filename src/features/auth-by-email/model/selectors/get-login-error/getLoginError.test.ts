import { DeepPartial } from '@reduxjs/toolkit';
import { getLoginError } from './getLoginError';
import { IStateSchema } from 'app/providers/store-provider';

describe('getLoginError', () => {
  test('Return login state error prop', () => {
    const state: DeepPartial<IStateSchema> = {
      login: { error: 'error' },
    };

    expect(getLoginError(state as IStateSchema)).toBe('error');
  });

  test('Return login state error prop', () => {
    const state: DeepPartial<IStateSchema> = {
      login: { error: null },
    };

    expect(getLoginError(state as IStateSchema)).toBe(null);
  });

  test('Return login state error prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getLoginError(state as IStateSchema)).toBe(null);
  });
});
