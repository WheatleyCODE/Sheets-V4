import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { I{{pascalCase}}, I{{pascalCase}}Schema } from '../types/{{camelCase}}';
import { fetch{{pascalCase}} } from '../services/fetch-{{kebabCase}}/fetch{{pascalCase}}';

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

  extraReducers(builder) {
    builder.addCase(fetch{{pascalCase}}.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetch{{pascalCase}}.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.profile = payload;
    });
    builder.addCase(fetch{{pascalCase}}.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload || null;
    });
  },
});

export const { actions: {{camelCase}}Actions, reducer: {{camelCase}}Reducer } = {{camelCase}}Slice;
