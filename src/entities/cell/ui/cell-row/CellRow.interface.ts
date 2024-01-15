export interface ICellRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  id: number;
  value: string;
  height: number;
}
