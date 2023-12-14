import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import styles from './SheetsPage.module.scss';
import { HookBuilder } from '@/shared/lib/hook-builder';
import {
  IUseChangeParams,
  IUseChangeResult,
  IUseClickOutsideParams,
  IUseClickOutsideResult,
  IUseFocusParams,
  IUseFocusResult,
  IUseHoverParams,
  IUseHoverResult,
  IUseKeydownParams,
  IUseKeydownResult,
  useChange,
  useClickOutside,
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
  onMouseEnter: () => console.log('enter'),
};

const useFocusParams: IUseFocusParams<HTMLInputElement> = {
  onBlur: () => console.log('blur'),
};

const useKeydownParams: IUseKeydownParams = {
  onKeyDown: (e) => console.log(e),
};

const useChangeParams: IUseChangeParams<HTMLInputElement, string> = {
  initValue: 'string',
};

const useClickOutsideParams: IUseClickOutsideParams = {
  handler: () => console.log('outside'),
};

const useMyHook = new HookBuilder<UseMyHookResult<HTMLInputElement>, HTMLInputElement>(1)
  .addHook(useFocus, useFocusParams)
  .addHook(useHover, useHoverParams)
  .addHook(useKeydown, useKeydownParams)
  .addHook(useChange, useChangeParams)
  .addHook(useClickOutside, useClickOutsideParams)
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
