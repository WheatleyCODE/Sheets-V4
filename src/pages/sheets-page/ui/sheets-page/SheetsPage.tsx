import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import styles from './SheetsPage.module.scss';
import { HookBuilder } from '@/shared/lib/hook-builder';
import {
  IUseChangeParams,
  IUseChangeResult,
  IUseClickOutsideParams,
  IUseClickOutsideResult,
  IUseClickParams,
  IUseDelayHoverParams,
  IUseFocusParams,
  IUseFocusResult,
  IUseHoverParams,
  IUseHoverResult,
  IUseKeydownParams,
  IUseKeydownResult,
  useChange,
  useClick,
  useClickOutside,
  useDelayHover,
  useFocus,
} from '@/shared/lib/hooks/hooks-for-builder';
import { useHover } from '@/shared/lib/hooks/hooks-for-builder';
import { useKeydown } from '@/shared/lib/hooks/hooks-for-builder';

type UseMyHookResult<T> = [
  IUseHoverResult<T>,
  IUseFocusResult<T>,
  IUseKeydownResult,
  IUseChangeResult<T, string>,
  IUseClickOutsideResult,
];

const useHoverParams: IUseHoverParams<HTMLInputElement> = {
  onMouseEnter: () => console.log('onMouseEnter'),
};

const useFocusParams: IUseFocusParams<HTMLInputElement> = {
  onBlur: () => console.log('onBlur'),
};

const useKeydownParams: IUseKeydownParams = {
  onKeyDown: () => console.log('onKeyDown'),
};

const useChangeParams: IUseChangeParams<HTMLInputElement, string> = {
  initValue: 'string',
  onChange: () => console.log('onChange'),
};

const useClickParams: IUseClickParams<HTMLInputElement> = {
  onMouseDown: () => console.log('onMouseDown'),
};

// const useClickOutsideParams: IUseClickOutsideParams = {
//   handler: () => console.log('outside'),
// };

// const useDelayHoverParams: IUseDelayHoverParams<HTMLInputElement> = {
//   onMouseEnter: () => console.log('onMouseEnter'),
// };

const useMyHook = new HookBuilder<UseMyHookResult<HTMLInputElement>, HTMLInputElement>()
  .addHook(useFocus, useFocusParams)
  .addHook(useHover, useHoverParams)
  // .addHook(useDelayHover, useDelayHoverParams)
  .addHook(useKeydown, useKeydownParams)
  .addHook(useChange, useChangeParams)
  .addHook(useClick, useClickParams)
  // .addHook(useClickOutside, useClickOutsideParams)
  .build();

const SheetsPage: FC = memo(() => {
  const { data, ref, dataChangers, eventHandlers } = useMyHook();

  console.log({ data, ref, dataChangers, eventHandlers });

  return (
    <section data-testid="sheetsPage" className={classNames(styles.sheets_page, {}, [])}>
      <input value={data.value} className={styles.test} ref={ref} {...eventHandlers} />
    </section>
  );
});

export default SheetsPage;
