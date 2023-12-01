export type ObjStyles = {
  top?: number | string;
  right?: number | string;
  left?: number | string;
  marginRight?: string;
  marginLeft?: string;
};

export type ForcePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export interface TitleProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  isStopShow?: boolean;
  classNameContainer?: string;
  forcePosition?: ForcePosition;
}
