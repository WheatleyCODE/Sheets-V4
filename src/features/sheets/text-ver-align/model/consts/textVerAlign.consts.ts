import { VerticalAligns } from '@/entities/cell';
import { IControllableMenuItem } from '@/shared/ui/controllable-menu';
import { MdVerticalAlignBottom, MdVerticalAlignCenter, MdVerticalAlignTop } from 'react-icons/md';

export const verAligns: IControllableMenuItem[] = [
  { text: 'Top', value: VerticalAligns.TOP, Icon: MdVerticalAlignTop },
  { text: 'Center', value: VerticalAligns.CENTER, Icon: MdVerticalAlignCenter },
  { text: 'Bottom', value: VerticalAligns.BOTTOM, Icon: MdVerticalAlignBottom },
];
