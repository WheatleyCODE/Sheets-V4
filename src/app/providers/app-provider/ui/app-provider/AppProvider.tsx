import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../../theme-provider';
import { ErrorBoundary } from '../../../error-boundary';
import { StoreProvider } from '../../../store-provider';

export const AppProvider: FC<FCProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <ThemeProvider>{children}</ThemeProvider>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  );
};
