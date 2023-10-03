import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { DeepPartial as DP } from 'shared/lib/ts-utils';
import { Story } from '@storybook/react';
import { IStateSchema, StoreProvider } from 'app/providers/store-provider';
import { loginReducer } from 'features/auth-by-email/model/slice/loginSlice';
import { ReducersList } from 'shared/lib/hooks/useDynamicModule';
import { profileReducer } from 'entities/profile';

const defaultAsyncReducers: ReducersList = {
  login: loginReducer,
  profile: profileReducer,
};

export const storeDecorator =
  (state: DP<IStateSchema> = {}, asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>) =>
  (Story: Story) => {
    return (
      <StoreProvider initialState={state as IStateSchema} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <Story />
      </StoreProvider>
    );
  };
