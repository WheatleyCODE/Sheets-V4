import { IconType } from 'react-icons';

export interface IStarProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  StarIcon: IconType;
  getChangeCurrent: (num: number) => () => void;
  selectStar: () => void;
  isSelect: boolean;
}
