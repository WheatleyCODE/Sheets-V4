// import { HTMLAttributes } from 'react';
// import { IInputSpecificProps, IUseValidInputResult } from '../../../input';
// import { IControllableMenuItem, IControllableMenuSpecificProps } from '../../../controllable-menu';
// import {
//   IUseDefaultEventsOpts,
//   IUseDefaultEventsResult,
//   IUseDefaultEventsResultData,
//   IUseDefaultEventsResultHandlers,
// } from '@/shared/lib/hooks';
// import {
//   IUseControllableMenuParams,
//   IUseControllableMenuResult,
// } from '../../../controllable-menu/ui/controllable-menu/ControllableMenu.interface';
// import { IUseValidInputParams } from '../../../input/ui/input/Input.interface';
// export interface ISelectSpecificProps extends IControllableMenuSpecificProps {
//   isSearch?: boolean;
//   isForbidInput?: boolean;
// }

// export interface ISelectProps
//   extends Omit<
//       HTMLAttributes<HTMLDivElement>,
//       keyof IUseSelectResultHandlers<HTMLDivElement> | keyof IUseSelectResultData | keyof IUseSelectReturnData
//     >,
//     IInputSpecificProps,
//     ISelectSpecificProps,
//     IUseSelectReturnData {}

// export interface IUseSelectResultData extends IUseDefaultEventsResultData {
//   isShow: boolean;
//   changeIsShow: (boolean: boolean) => void;
//   selectItemAndClose: (item?: IControllableMenuItem) => void;
// }

// export interface IUseSelectResultHandlers<EL> extends IUseDefaultEventsResultHandlers<EL> {}

// export interface IUseSelectResult<EL = HTMLDivElement> extends IUseDefaultEventsResult<EL> {
//   data: IUseSelectResultData;
//   handlers: IUseSelectResultHandlers<EL>;
// }
// export interface IUseSelectReturnData {
//   select: IUseSelectResult;
//   input: IUseValidInputResult;
//   controllableMenu: IUseControllableMenuResult;
// }

// export interface IUseSelectOpts {}

// export interface IUseSelectParams {
//   default?: IUseDefaultEventsOpts<HTMLDivElement>;
//   select?: IUseSelectOpts;
// }

// export interface IUseSelectHooksParams {
//   select?: IUseSelectParams;
//   input?: IUseValidInputParams<string>;
//   controllableMenu?: IUseControllableMenuParams;
// }
