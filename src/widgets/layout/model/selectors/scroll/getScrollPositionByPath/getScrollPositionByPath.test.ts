import { DeepPartial } from '@/shared/lib/ts-utils';
import { getScrollPositionByPath } from './getScrollPositionByPath';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getScrollPositionByPath', () => {
  test('Return scroll by path', () => {
    const state: DeepPartial<IStateSchema> = {
      scroll: { scroll: { '/home': 300, '/page': 400 } },
    };

    expect(getScrollPositionByPath(state as IStateSchema, '/home')).toBe(300);
    expect(getScrollPositionByPath(state as IStateSchema, '/page')).toBe(400);
    expect(getScrollPositionByPath(state as IStateSchema, '/lololo')).toBe(0);
  });
});
