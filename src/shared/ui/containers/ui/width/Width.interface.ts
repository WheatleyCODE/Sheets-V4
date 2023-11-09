import { IFlexProps } from '../flex/Flex.interface';

export type WidthMaxWidthNames = 'template' | 'sheets' | 'default';

export interface IWidthProps extends IFlexProps {
  maxWidth?: WidthMaxWidthNames;
}
