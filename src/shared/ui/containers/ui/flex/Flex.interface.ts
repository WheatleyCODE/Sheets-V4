export type FlexJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse';
export type FlexGapMultiply = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

export interface IFlexProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gapMultiply?: FlexGapMultiply;
}
