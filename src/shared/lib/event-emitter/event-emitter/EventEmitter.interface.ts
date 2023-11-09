import { DataTypes, EventNames } from './EventEmitter.consts';

export type FocusFormula = {
  id: string;
  eventName: EventNames.FOCUS;
  type: DataTypes.FOCUS_FORMULA;
};

export type SelectFormula = {
  id: string;
  eventName: EventNames.SELECT;
  type: DataTypes.SELECT_FORMULA;
};

export type MouseEnterCell = {
  id: string;
  eventName: EventNames.MOUSE_ENTER;
  type: DataTypes.MOUSE_ENTER_CELL;
};

export type SelectCell = {
  id: string;
  eventName: EventNames.SELECT;
  type: DataTypes.SELECT_CELL;
};

export type EventEmitterData = FocusFormula | SelectFormula | MouseEnterCell | SelectCell;
