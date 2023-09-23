import { lazy } from "react";

export const HomePage = lazy(
  () =>
    new Promise((res) => {
      // @ts-ignore
      // ! DEV DELAY
      setTimeout(() => res(import("./HomePage")), 500);
    })
);
