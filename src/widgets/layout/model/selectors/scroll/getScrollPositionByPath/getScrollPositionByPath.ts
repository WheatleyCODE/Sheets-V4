import { createSelector } from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/store-provider';
import { getScroll } from '../get-scroll/getScroll';

export const getScrollPositionByPath = createSelector(
  getScroll,
  (state: IStateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
