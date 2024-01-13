import { MdFormatAlignCenter, MdFormatAlignLeft, MdFormatAlignRight } from 'react-icons/md';
import { IControllableMenuItem } from '@/shared/ui/controllable-menu';
import { HorizontalAligns } from '@/entities/cell';

export const horAligns: IControllableMenuItem[] = [
  { text: 'Left', value: HorizontalAligns.LEFT, Icon: MdFormatAlignLeft },
  { text: 'Center', value: HorizontalAligns.CENTER, Icon: MdFormatAlignCenter },
  { text: 'Right', value: HorizontalAligns.RIGHT, Icon: MdFormatAlignRight },
];
