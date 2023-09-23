import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../theme/ThemeProvider";

export const AppProvider: FC<FCProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>{children}</ThemeProvider>
    </BrowserRouter>
  );
};
