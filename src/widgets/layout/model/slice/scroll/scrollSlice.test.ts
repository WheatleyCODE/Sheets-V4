import { IScrollSchema } from '../../types/scroll/scroll.interface';
import { scrollActions, scrollReducer } from './scrollSlice';
import { DeepPartial } from '@/shared/lib/ts-utils';

describe('scrollSlice', () => {
  test('Test scrollReducer initState', () => {
    const state: DeepPartial<IScrollSchema> = {
      scroll: {
        '/hello': 200,
      },
    };

    expect(
      scrollReducer(state as IScrollSchema, scrollActions.setScrollPosition({ path: '/home', position: 30 })),
    ).toEqual({
      scroll: {
        '/hello': 200,
        '/home': 30,
      },
    });
  });
});
