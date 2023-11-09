import { createContext } from 'react';
import type { IDragLineContextProps } from './DragLineContext.interface';

const initContext: IDragLineContextProps = { items: [], setItems: () => {} };

export const DragLineContext = createContext<IDragLineContextProps>(initContext);
