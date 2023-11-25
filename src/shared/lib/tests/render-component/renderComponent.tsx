import { render } from '@testing-library/react';
import { IStateSchema, StoreProvider } from '@/app/providers/store-provider';
// eslint-disable-next-line wheatley-code/layer-imports
import { ThemeProvider } from '@/app/providers/theme-provider';
import { FC, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import type { IRenderComponentOptions, ITestProviderProps } from './renderComponent.interface';
// eslint-disable-next-line wheatley-code/layer-imports
import '@/app/styles/index.scss';

export const TestProvider: FC<ITestProviderProps> = ({ children, options = {} }) => {
  const { route = '/', initialState, initTheme, asyncReducers } = options;

  return (
    <StoreProvider asyncReducers={asyncReducers} initialState={initialState as IStateSchema}>
      <MemoryRouter initialEntries={[route]}>
        <ThemeProvider initTheme={initTheme}>
          <I18nextProvider i18n={i18nForTests}>{children}</I18nextProvider>
        </ThemeProvider>
      </MemoryRouter>
    </StoreProvider>
  );
};

export const renderComponent = (component: ReactNode, options: IRenderComponentOptions = {}) => {
  return render(<TestProvider options={options}>{component}</TestProvider>);
};
