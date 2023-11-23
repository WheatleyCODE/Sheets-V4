import { useSelector } from 'react-redux';
import type { Result, Selector } from './buildSelector.interface';

// ! Сделать множество селекторов через create selector

export function buildSelector<T>(selector: Selector<T>): Result<T> {
  const useBuildSelectorHook = () => {
    return useSelector(selector);
  };

  return [useBuildSelectorHook, selector];
}
