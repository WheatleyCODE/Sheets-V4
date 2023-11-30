import { createSelector } from '@reduxjs/toolkit';
import { getModals } from '../get-modals/getModals';
import { buildSelector } from '@/shared/lib/store';

export const [useModalsIsAuth, getModalsIsAuth] = buildSelector(createSelector(getModals, (modals) => modals.isAuth));
