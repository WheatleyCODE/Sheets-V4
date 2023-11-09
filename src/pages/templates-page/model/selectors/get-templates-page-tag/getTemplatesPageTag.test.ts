import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplatesPageTag } from './getTemplatesPageTag';
import { IStateSchema } from 'app/providers/store-provider';
import { TemplateTags } from 'entities/template';

describe('getTemplatesPageTag', () => {
  test('Return template page state tag prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { tag: TemplateTags.ACCOUNTING },
    };

    expect(getTemplatesPageTag(state as IStateSchema)).toBe(TemplateTags.ACCOUNTING);
  });

  test('Return template page state tag prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPageTag(state as IStateSchema)).toBe(TemplateTags.ALL);
  });
});
