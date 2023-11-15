export interface IStarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  initStar?: number;
  isStarred?: boolean;
  onSelectStar?: (num: number) => void;
}

export type GetStarts = (
  current: number,
  getChangeCurrent: (num: number) => () => void,
  isSelect: boolean,
  selectStar: (num: number) => void,
) => JSX.Element[];
