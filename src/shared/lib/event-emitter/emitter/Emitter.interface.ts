export interface IEmitterData {
  id: string;
  eventName: string;
  payload?: unknown;
}

export interface IEmitterSubs<D extends IEmitterData> {
  [id: string]: { [eventName: string]: Array<(data: D) => void> };
}
