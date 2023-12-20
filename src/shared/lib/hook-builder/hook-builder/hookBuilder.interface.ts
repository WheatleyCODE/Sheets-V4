import { MutableRefObject } from 'react';

export type HookForBuilderData = {
  data: object;
  dataChangers: object;
  eventHandlers: object;
};

export type HookForBuilderParams = any;

export type HookForBuilder<EL extends HTMLElement> = (
  ref: MutableRefObject<EL | null>,
  args: HookForBuilderParams,
) => HookForBuilderData;

export type ArrMergeValues<
  T extends HookForBuilderData[],
  K extends keyof HookForBuilderData,
> = T[number] extends HookForBuilderData
  ? T[0][K] & T[1][K] & T[2][K] & T[3][K] & T[4][K] & T[5][K] & T[6][K] & T[7][K] & T[8][K] & T[9][K] & T[10][K]
  : never;
