import { createSelector } from '@reduxjs/toolkit';
import { getTemplateDetails } from '@/entities/template';
import { getUser } from '@/entities/user';
import { buildSelector } from '@/shared/lib/store';

export const [useTemplateDetailsIsCanEdit, getTemplateDetailsIsCanEdit] = buildSelector(
  createSelector(getTemplateDetails, getUser, (template, user) => {
    if (!template || !user) {
      return false;
    }

    return template?.user?.id === user.id;
  }),
);
