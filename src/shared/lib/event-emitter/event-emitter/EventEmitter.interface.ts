import { DataTypes, EventNames } from './EventEmitter.consts';
import type { IEmitterData } from '../emitter/Emitter.interface';

export interface IFocusFormula extends IEmitterData {
  eventName: EventNames.FOCUS;
  type: DataTypes.FOCUS_FORMULA;
}

export interface ISelectFormula extends IEmitterData {
  eventName: EventNames.SELECT;
  type: DataTypes.SELECT_FORMULA;
}

export interface ISelectCell extends IEmitterData {
  eventName: EventNames.SELECT;
  type: DataTypes.SELECT_CELL;
}

export interface IMouseEnterCell extends IEmitterData {
  eventName: EventNames.MOUSE_ENTER;
  type: DataTypes.MOUSE_ENTER_CELL;
}

export interface IScrollToBottom extends IEmitterData {
  eventName: EventNames.SCROLL;
  type: DataTypes.SCROLL_TO_BOTTOM;
}

export type EventEmitterData = IFocusFormula | ISelectFormula | IMouseEnterCell | ISelectCell | IScrollToBottom;
