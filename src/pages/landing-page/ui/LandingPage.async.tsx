import { lazy } from "react";

export const LandingPage = lazy(
  () =>
    new Promise((res) => {
      // @ts-ignore
      setTimeout(() => res(import("./LandingPage")), 500);
    })
);
