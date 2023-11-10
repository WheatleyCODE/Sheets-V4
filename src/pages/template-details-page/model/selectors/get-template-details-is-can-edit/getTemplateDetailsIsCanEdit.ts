import { createSelector } from '@reduxjs/toolkit';
import { getTemplateDetails } from '@/entities/template';
import { getUser } from '@/features/user';

export const getTemplateDetailsIsCanEdit = createSelector(getTemplateDetails, getUser, (template, user) => {
  if (!template || !user) {
    return false;
  }

  return template?.user?.id === user.id;
});
