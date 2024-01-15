import { PayloadAction } from '@reduxjs/toolkit';
import { initial{{pascalCase}}State } from '../consts/{{camelCase}}.consts';
import { buildSlice } from '@/shared/lib/store';
import type { I{{pascalCase}} } from '../types/{{camelCase}}.interface';

export const {{camelCase}}Slice = buildSlice({
  name: '{{camelCase}}',
  initialState: initial{{pascalCase}}State,
  reducers: {
    set{{pascalCase}}(state, { payload }: PayloadAction<I{{pascalCase}}>) {
      state.{{camelCase}} = payload;
    },
  },
});

export const { actions: {{camelCase}}Actions, reducer: {{camelCase}}Reducer, useActions: use{{pascalCase}}Actions } = {{camelCase}}Slice;
