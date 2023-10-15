import { DeepPartial } from 'shared/lib/ts-utils';

export interface IClientXY {
  clientX: number;
  clientY: number;
}

export interface IOffsetXY {
  offsetX: number;
  offsetY: number;
}

export interface ICoords extends DeepPartial<IClientXY>, DeepPartial<IOffsetXY> {}

export const getClientXY = ({ clientX, clientY }: IClientXY): IClientXY => ({ clientX, clientY });

export const saveCoords = (coords: ICoords, event: ICoords) => {
  coords.clientX = event.clientX;
  coords.clientY = event.clientY;
  coords.offsetX = event.offsetX;
  coords.offsetY = event.offsetY;
};

export const getCoords = ({ clientX, clientY, offsetX, offsetY }: ICoords) => ({ clientX, clientY, offsetX, offsetY });
