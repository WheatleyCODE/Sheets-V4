import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { IStateSchema, StoreProvider } from 'app/providers/store-provider';
import { loginReducer } from 'features/auth-by-email/model/slice/loginSlice';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<IStateSchema>> = {
  login: loginReducer,
};

export const storeDecorator =
  (state: DeepPartial<IStateSchema> = {}, asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>) =>
  (Story: Story) => {
    return (
      <StoreProvider initialState={state as IStateSchema} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <Story />
      </StoreProvider>
    );
  };
