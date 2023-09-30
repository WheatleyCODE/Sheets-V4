import { Story } from '@storybook/react';
import { createReduxStore } from 'app/providers/store-provider';
import { Provider } from 'react-redux';

export const storeDecorator = (Story: Story) => {
  const store = createReduxStore();

  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
};
