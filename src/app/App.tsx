import { FC, Suspense } from "react";
import { classNames } from "shared/lib/class-names";
import { useTheme, AppRouter } from "./providers";
import { Navbar } from "widgets/navbar";
import "./styles/index.scss";

export const App: FC = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <AppRouter />
      </Suspense>
    </div>
  );
};
