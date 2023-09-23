import { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { ExcelPage } from "pages/excel-page/ui/ExcelPage.async";
import { HomePage } from "pages/home-page/ui/HomePage.async";
import { LandingPage } from "pages/landing-page/ui/LandingPage.async";
import { classNames } from "shared/lib/class-names";
import { useTheme } from "./providers";
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

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/excel"} element={<ExcelPage />} />
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/"} element={<LandingPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
