import { FC, Suspense } from "react";
import { Link } from "react-router-dom";
import { classNames } from "shared/lib/class-names";
import { useTheme, AppRouter } from "./providers";
import "./styles/index.scss";

export const App: FC = () => {
  // todo: Сделать выпадающий список с выбором темы
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Link to="/excel">ExcelPage</Link>
      <Link to="/home">HOME</Link>
      <Link to="/">LANDING</Link>

      <button onClick={toggleTheme}>Toggle Theme</button>

      <AppRouter />
    </div>
  );
};
