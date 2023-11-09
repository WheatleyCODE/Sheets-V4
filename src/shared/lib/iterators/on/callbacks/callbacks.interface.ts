import { DeepPartial } from '../../../ts-utils';

export interface IClientXY {
  clientX: number;
  clientY: number;
}

export interface IOffsetXY {
  offsetX: number;
  offsetY: number;
}

export interface ICoords extends DeepPartial<IClientXY>, DeepPartial<IOffsetXY> {}
