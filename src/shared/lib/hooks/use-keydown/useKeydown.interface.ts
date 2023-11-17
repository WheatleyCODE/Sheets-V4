export type EventHandler = (e?: KeyboardEvent) => void;
export type KeyboardKeys = 'Escape' | 'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight';

export type UseKeydownOpts = {
  [key in KeyboardKeys]?: EventHandler[];
};
