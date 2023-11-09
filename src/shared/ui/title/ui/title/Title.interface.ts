export type ObjStyles = {
  top?: number | string;
  right?: number | string;
  left?: number | string;
  marginRight?: string;
  marginLeft?: string;
};

export interface TitleProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  isStopShow?: boolean;
  classNameContainer?: string;
}
