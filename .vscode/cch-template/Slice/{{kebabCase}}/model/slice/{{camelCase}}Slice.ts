import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { I{{pascalCase}}, I{{pascalCase}}Schema } from '../types/{{camelCase}}';

const initialState: I{{pascalCase}}Schema = {
  {{camelCase}}: { a: null },
};

export const {{camelCase}}Slice = createSlice({
  name: '{{camelCase}}',
  initialState,
  reducers: {
    set{{pascalCase}}(state, { payload }: PayloadAction<I{{pascalCase}}>) {
      state.{{camelCase}} = payload;
    },
  },
});

export const { actions: {{camelCase}}Actions, reducer: {{camelCase}}Reducer } = {{camelCase}}Slice;
