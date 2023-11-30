import { DeepPartial } from '@/shared/lib/ts-utils';
import { getScroll } from './getScroll';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getScroll', () => {
  test('Return scroll', () => {
    const state: DeepPartial<IStateSchema> = {
      scroll: { scroll: { '/home': 300, '/page': 400 } },
    };

    expect(getScroll(state as IStateSchema)).toEqual({ '/home': 300, '/page': 400 });
  });
});
