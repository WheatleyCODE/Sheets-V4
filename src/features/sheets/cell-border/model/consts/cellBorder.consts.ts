import { Border } from '@/entities/cell';
import { IControllableMenuItem } from '@/shared/ui/controllable-menu';
import {
  MdBorderAll,
  MdBorderBottom,
  MdBorderClear,
  MdBorderLeft,
  MdBorderOuter,
  MdBorderRight,
  MdBorderTop,
} from 'react-icons/md';

export const borders: IControllableMenuItem[] = [
  { text: 'All', value: Border.All, Icon: MdBorderAll },
  { text: 'Outer', value: Border.OUTER, Icon: MdBorderOuter },
  { text: 'Top', value: Border.TOP, Icon: MdBorderTop },
  { text: 'Right', value: Border.RIGHT, Icon: MdBorderRight },
  { text: 'Bottom', value: Border.BOTTOM, Icon: MdBorderBottom },
  { text: 'Left', value: Border.LEFT, Icon: MdBorderLeft },
  { text: 'Clear', value: Border.CLEAR, Icon: MdBorderClear },
];
