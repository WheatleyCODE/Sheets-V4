import { MdOutlineFontDownload } from 'react-icons/md';
import { Fonts } from '@/entities/cell';
import { IControllableMenuItem } from '@/shared/ui/controllable-menu';

export const fontFamilies: IControllableMenuItem[] = [
  { text: 'Arial', value: Fonts.ARIAL, Icon: MdOutlineFontDownload },
  { text: 'Roboto', value: Fonts.ROBOTO, Icon: MdOutlineFontDownload },
  { text: 'Comfortaa', value: Fonts.COMFORTAA, Icon: MdOutlineFontDownload },
  { text: 'Verdana', value: Fonts.VERDANA, Icon: MdOutlineFontDownload },
];
