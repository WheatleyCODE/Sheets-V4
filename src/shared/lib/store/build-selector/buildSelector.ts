import { useSelector } from 'react-redux';
import { IStateSchema } from '@/app/providers/store-provider';
import type { Hook, Result, Selector } from './buildSelector.interface';

export function buildSelector<T, Args extends any[]>(selector: Selector<T, Args>): Result<T, Args> {
  const useBuildSelectorHook: Hook<T, Args> = (...args) => {
    return useSelector<IStateSchema, T>((state) => selector(state, ...args));
  };

  return [useBuildSelectorHook, selector];
}
