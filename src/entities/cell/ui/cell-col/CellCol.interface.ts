export interface ICellColProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  id: number;
  value: string;
  width: number;
}
