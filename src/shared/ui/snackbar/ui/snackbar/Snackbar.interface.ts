import type { UseSnackbarResult } from './Snackbar.hooks';

type EventHandlers = UseSnackbarResult['eventHandlers'];

export interface ISnackbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof EventHandlers>,
    UseSnackbarResult {}
