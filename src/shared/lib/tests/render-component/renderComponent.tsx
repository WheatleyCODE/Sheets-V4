import { render } from '@testing-library/react';
import { IStateSchema, StoreProvider } from 'app/providers/store-provider';
import { ThemeProvider } from 'app/providers/theme-provider';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import type { IRenderComponentOptions } from './renderComponent.interface';

export const renderComponent = (component: ReactNode, options: IRenderComponentOptions = {}) => {
  const { route = '/', initialState, initTheme, asyncReducers } = options;

  return render(
    <StoreProvider asyncReducers={asyncReducers} initialState={initialState as IStateSchema}>
      <MemoryRouter initialEntries={[route]}>
        <ThemeProvider initTheme={initTheme}>
          <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
        </ThemeProvider>
      </MemoryRouter>
    </StoreProvider>,
  );
};
