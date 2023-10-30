import { {{camelCase}}Actions, {{camelCase}}Reducer } from './{{camelCase}}Slice';
import { fetch{{pascalCase}} } from '../services/fetch-{{kebabCase}}/fetch{{pascalCase}}';
import { I{{pascalCase}}, I{{pascalCase}}Schema } from '../types/{{camelCase}}';
import { DeepPartial } from 'shared/lib/ts-utils';

describe('{{camelCase}}Reducer', () => {
  test('Test {{camelCase}} set{{pascalCase}}', () => {
    const state: DeepPartial<I{{pascalCase}}Schema> = {};

    const {{camelCase}}: I{{pascalCase}} = {
      a: null,
    };

    expect({{camelCase}}Reducer(state as I{{pascalCase}}Schema, {{camelCase}}Actions.set{{pascalCase}}({{camelCase}}))).toEqual({ {{camelCase}} });
  });

  test('Test {{camelCase}} fetch{{pascalCase}} pending', () => {
    const state: DeepPartial<I{{pascalCase}}Schema> = {
      isLoading: false,
      error: 'error',
    };

    expect({{camelCase}}Reducer(state as I{{pascalCase}}Schema, fetch{{pascalCase}}.pending)).toEqual({ isLoading: true, error: null });
  });

  test('Test {{camelCase}} fetch{{pascalCase}} rejected', () => {
    const state: DeepPartial<I{{pascalCase}}Schema> = {
      isLoading: true,
      error: 'error',
    };

    expect({{camelCase}}Reducer(state as I{{pascalCase}}Schema, fetch{{pascalCase}}.rejected)).toEqual({ isLoading: false, error: null });
  });
});
