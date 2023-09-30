import { DeepPartial } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { IStateSchema, createReduxStore } from 'app/providers/store-provider';
import { Provider } from 'react-redux';

export const storeDecorator =
  (initialState: DeepPartial<IStateSchema> = {}) =>
  (Story: Story) => {
    const store = createReduxStore(initialState as IStateSchema);

    return (
      <Provider store={store}>
        <Story />
      </Provider>
    );
  };
