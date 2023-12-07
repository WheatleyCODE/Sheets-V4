export interface ITextLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  linesCount?: number;
  isLastShort?: boolean;
  firstLetter?: string;
  delayLinesAnimation?: number;
}
