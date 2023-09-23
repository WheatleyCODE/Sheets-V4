import { lazy } from "react";

export const ExcelPage = lazy(
  () =>
    new Promise((res) => {
      // @ts-ignore
      // ! DEV DELAY
      setTimeout(() => res(import("./ExcelPage")), 500);
    })
);
