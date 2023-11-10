import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/theme-provider';
import { ErrorBoundary } from '@/app/providers/error-boundary';
import { StoreProvider } from '@/app/providers/store-provider';

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
