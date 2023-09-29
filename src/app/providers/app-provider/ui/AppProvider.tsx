import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/theme-provider';
import { ErrorBoundary } from 'app/providers/error-boundary';
import { StoreProvider } from 'app/providers/store-provider';

export const AppProvider: FC<FCProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
