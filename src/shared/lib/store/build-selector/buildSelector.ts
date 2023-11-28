/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { IStateSchema } from '@/app/providers/store-provider';
import type { Hook, Hook2, Result, Result2, Selector, Selector2, Selector3 } from './buildSelector.interface';

export function buildSelector<T, Args extends any[]>(...selectors: [Selector<T, Args>]): Result<T, Args>;
export function buildSelector<T, D>(...selectors: [Selector2<T>, Selector3<T, D>]): Result2<D>;
export function buildSelector<T, D, F>(...selectors: [Selector2<T>, Selector3<T, D>, Selector3<D, F>]): Result2<F>;
export function buildSelector<T, D, F, C>(
  ...selectors: [Selector2<T>, Selector3<T, D>, Selector3<D, F>, Selector3<F, C>]
): Result2<C>;
export function buildSelector<T, D, F, C, R>(
  ...selectors: [Selector2<T>, Selector3<T, D>, Selector3<D, F>, Selector3<F, C>, Selector3<C, R>]
): Result2<R>;
export function buildSelector<T, Args extends any[]>(...selectors: any[]) {
  if (selectors.length === 1) {
    const useBuildSelectorHook: Hook<T, Args> = (...args) => {
      return useSelector<IStateSchema, T>((state) => selectors[0](state, ...args));
    };

    return [useBuildSelectorHook, selectors[0]];
  }

  if (selectors.length > 1) {
    // ! FIX
    // @ts-ignore
    const selector = createSelector(...selectors);

    const useBuildSelectorHook: Hook2<T> = () => {
      return useSelector<IStateSchema, any>(selector);
    };

    return [useBuildSelectorHook, selector];
  }
}
