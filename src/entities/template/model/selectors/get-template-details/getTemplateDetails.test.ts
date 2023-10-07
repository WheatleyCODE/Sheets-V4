import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplateDetails, initTemplate } from './getTemplateDetails';
import { IStateSchema } from 'app/providers/store-provider';
import { ITemplate } from '../../types/template';

describe('getTemplateDetails', () => {
  test('Return template field', () => {
    const template: ITemplate = {
      id: '1',
      title: 'Title',
      subtitle: 'Sub title',
      image: 'http://...',
      views: 100,
      createdAt: '24.02.2004',
      tags: [],
      blocks: [],
      template: {},
    };

    const state: DeepPartial<IStateSchema> = {
      templateDetails: { template },
    };

    expect(getTemplateDetails(state as IStateSchema)).toEqual(template);
  });

  test('Return template field, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplateDetails(state as IStateSchema)).toEqual(initTemplate);
  });
});
