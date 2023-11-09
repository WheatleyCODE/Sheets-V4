import { TextSize, TextStyle } from './Text.consts';

export interface ITextProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  text?: string;
  textStyle?: TextStyle;
  textSize?: TextSize;
  textTag?: TextTagType;
  titleTag?: TextTagType;
}

export type TextTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
