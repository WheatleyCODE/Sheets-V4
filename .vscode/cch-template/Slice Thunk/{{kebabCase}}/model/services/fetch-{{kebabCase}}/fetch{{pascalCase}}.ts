import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig, IThunkExtra } from 'app/providers/store-provider';
import i18n from 'shared/config/i18n/i18n';
import { I{{pascalCase}} } from '../../types/{{camelCase}}';

export const fetch{{pascalCase}} = createAsyncThunk<I{{pascalCase}}, void, IThunkConfig>(
  '{{camelCase}}/fetch{{pascalCase}}',
  async (_, thunkAPI) => {
    try {
      const extra = thunkAPI.extra as IThunkExtra;

      const { data } = await extra.api.get<I{{pascalCase}}>('/{{kebabCase}}');
      if (!data) throw new Error();

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Ошибка {{camelCase}}'));
    }
  },
);
