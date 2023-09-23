import { lazy } from "react";

// export const LandingPage = lazy(() => import("./LandingPage"));

export const LandingPage = lazy(
  () =>
    new Promise((res) => {
      // @ts-ignore
      // ! DEV DELAY
      setTimeout(() => res(import("./LandingPage")), 500);
    })
);
