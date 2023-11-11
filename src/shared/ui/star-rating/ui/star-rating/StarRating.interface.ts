export interface IStarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  initStar?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  onSelectStar?: (num: number) => void;
}

export type GetStarts = (
  current: number,
  getChangeCurrent: (num: number) => () => void,
  isSelect: boolean,
  selectStar: (num: number) => void,
) => JSX.Element[];
