import { FC, Suspense, useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { ExcelPage } from "./pages/excel-page/ExcelPage.async";
import { HomePage } from "./pages/home-page/HomePage.async";
import { LandingPage } from "./pages/landing-page/LandingPage.async";
import { useTheme } from "./theme/useTheme";
import "./styles/index.scss";
import { classNames } from "./helpers/class-names/classNames";
import { Theme } from "./theme/ThemeContext";

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
