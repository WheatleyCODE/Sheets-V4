import { HookBuilder } from './hookBuilder';
import {
  IUseChangeResult,
  IUseClickOutsideResult,
  IUseFocusResult,
  IUseHoverResult,
  useChange,
  useFocus,
  useHover,
  useClick,
  IUseHoverParams,
  IUseFocusParams,
  IUseChangeParams,
  IUseClickParams,
} from '../../hooks/hooks-for-builder';
import { Cache } from '../../cache';

type UseMyHookResult<T> = [IUseHoverResult<T>, IUseFocusResult<T>, IUseChangeResult<T, string>, IUseClickOutsideResult];

const useHoverParams: IUseHoverParams<HTMLInputElement> = {
  onMouseEnter: () => console.log('onMouseEnter'),
};

const useFocusParams: IUseFocusParams<HTMLInputElement> = {
  onBlur: () => console.log('onBlur'),
};

const useChangeParams: IUseChangeParams<HTMLInputElement, string> = {
  initValue: 'string',
  onChange: () => console.log('onChange'),
};

const useClickParams: IUseClickParams<HTMLInputElement> = {
  onMouseDown: () => console.log('onMouseDown'),
};

describe('hookBuilder', () => {
  test('Works', () => {
    const useMyHook = new HookBuilder<UseMyHookResult<HTMLInputElement>, HTMLInputElement>()
      .enableMemo(new Cache(), 3000)
      .addHook(useFocus, useFocusParams)
      .addHook(useHover, useHoverParams)
      .addHook(useChange, useChangeParams)
      .addHook(useClick, useClickParams);
    // .build((a) => a);

    // ! Tests
    expect(typeof useMyHook === 'function').toBe(true);
  });
});
