import { DeepPartial } from 'shared/lib/ts-utils';
import { get{{pascalCase}} } from './get{{pascalCase}}';
import { IStateSchema } from 'app/providers/store-provider';

describe('get{{pascalCase}}', () => {
  test('Return user state {{camelCase}} prop', () => {
    const state: DeepPartial<IStateSchema> = {
      {{camelCase}}: { {{camelCase}}: { a: null } },
    };

    expect(get{{pascalCase}}(state as IStateSchema)).toEqual({ a: null });
  });

  test('Return user state {{camelCase}} prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(get{{pascalCase}}(state as IStateSchema)).toBe(undefined);
  });
});
