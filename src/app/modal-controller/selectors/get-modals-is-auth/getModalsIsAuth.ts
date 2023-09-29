import { createSelector } from '@reduxjs/toolkit';
import { getModals } from '../get-modals/getModals';

export const getModalsIsAuth = createSelector(getModals, (modals) => modals.isAuth);
