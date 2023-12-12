import { HTMLAttributes } from 'react';
import {
  IInputSpecificProps,
  IUseValidInputResult,
  IUseValidInputResultData,
  IUseValidInputResultHandlers,
} from '../../../input';
import { IControllableMenuSpecificProps } from '../../../controllable-menu';
export interface ISelectSpecificProps extends IControllableMenuSpecificProps {
  isSearch?: boolean;
  isForbidInput?: boolean;
}

export interface ISelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof IUseSelectResultHandlers | keyof IUseSelectResultHandlers>,
    IInputSpecificProps,
    ISelectSpecificProps {}

export interface IUseSelectResultData extends IUseValidInputResultData<string> {}
export interface IUseSelectResultHandlers extends IUseValidInputResultHandlers<HTMLInputElement> {}

export interface IUseSelectResult extends IUseValidInputResult<string, HTMLInputElement> {
  data: IUseSelectResultData;
  handlers: IUseSelectResultHandlers;
}
