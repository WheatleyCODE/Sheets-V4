import { FC, Suspense } from "react";
import { Link } from "react-router-dom";
import { classNames } from "shared/lib/class-names";
import { useTheme, AppRouter } from "./providers";
import "./styles/index.scss";
import { Navbar } from "widgets/navbar";

export const App: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Navbar toggleTheme={toggleTheme} />
      <AppRouter />
    </div>
  );
};
