import { IControllableMenuSpecificProps, UseControllableMenuParams } from '../../controllable-menu';
import { IInputSpecificProps, UseValidInputParams } from '../../input';
import type { UseSelectResult } from './Select.hooks';
import { IUseClickParams, IUseClickResult } from '@/shared/lib/hooks/hooks-for-builder';

export interface ISelectSpecificProps {
  isWritable?: boolean;
}

type Select = UseSelectResult['select'];

type SelectRef = Select['ref'];
type SelectData = Select['data'];
type SelectDataChangers = Select['dataChangers'];
type SelectEventHandlers = Select['eventHandlers'];

export interface ISelectProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      keyof SelectData | keyof SelectDataChangers | keyof SelectEventHandlers
    >,
    UseSelectResult,
    IInputSpecificProps,
    IControllableMenuSpecificProps,
    ISelectSpecificProps {
  selectRef: SelectRef;
}

export type UseSelectMergedTypes<T> = [IUseClickResult<T>];

export type UseSelectParams<T extends HTMLElement> = {
  useValidInput?: UseValidInputParams<T>;
  useControllableMenu?: UseControllableMenuParams;
  useClick?: IUseClickParams<T>;
};
