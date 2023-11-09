import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplatesPageView } from './getTemplatesPageView';
import { IStateSchema } from 'app/providers/store-provider';
import { TemplateView } from 'entities/template';

describe('getTemplatesPageView', () => {
  test('Return template page state view prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { view: TemplateView.LINES },
    };

    expect(getTemplatesPageView(state as IStateSchema)).toBe(TemplateView.LINES);
  });

  test('Return template page state view prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPageView(state as IStateSchema)).toBe(TemplateView.SQUARES);
  });
});
