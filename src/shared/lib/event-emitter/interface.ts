export interface IEmitterData {
  id: string;
  eventName: string;
  payload?: unknown;
}

export interface IEmitterSubs<D extends IEmitterData> {
  [id: string]: { [eventName: string]: Array<(data: D) => void> };
}

export const enum EventNames {
  FOCUS = 'FOCUS',
  SELECT = 'SELECT',
  MOUSE_ENTER = 'MOUSE_ENTER',
  MOUSE_MOVE = 'MOUSE_MOVE',
  MOUSE_LEAVE = 'MOUSE_LEAVE',
}

export const enum DataTypes {
  FOCUS_FORMULA = 'FOCUS_FORMULA',
  SELECT_FORMULA = 'SELECT_FORMULA',
  MOUSE_ENTER_CELL = 'MOUSE_ENTER_CELL',
  SELECT_CELL = 'SELECT_CELL',
}

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
