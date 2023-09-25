import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/theme-provider';
import { ErrorBoundary } from 'app/providers/error-boundary';

export const AppProvider: FC<FCProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>{children}</ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
