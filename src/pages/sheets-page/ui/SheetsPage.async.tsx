import { lazy } from "react";

export const SheetsPage = lazy(
  () =>
    new Promise((res) => {
      // @ts-ignore
      // ! DEV DELAY
      setTimeout(() => res(import("./SheetsPage.async")), 500);
    })
);
