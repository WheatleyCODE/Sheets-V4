import { FC, useMemo, useState } from 'react';
import { DragLineContext } from '../../lib/DragLineContext';
import { IDragLineItem } from '../drag-line-item/DragLineItem';

export interface IDragLineProviderProps extends FCProps {
  initItems?: IDragLineItem[];
}

export const DragLineProvider: FC<IDragLineProviderProps> = ({ children, initItems = [] }) => {
  const [items, setItems] = useState(initItems);

  const defaultProps = useMemo(() => ({ items, setItems }), [items, setItems]);

  return <DragLineContext.Provider value={defaultProps}>{children}</DragLineContext.Provider>;
};
