export const DEFAULT_DURATION = 1;
export const DEFAULT_DURATION_DELAY = 1;

export const DEFAULT_DURATION_X2 = 0.5;
export const DEFAULT_DURATION_X2_DELAY = 0.3;

export const FAST_DURATION = 0.1;
export const FAST_DURATION_DELAY = 0.1;

export const getInitialAnimation = (mult: number, translateX = -50, translateY = -50) => ({
  initial: { translateX, translateY, opacity: 0 },
  animate: { translateX: 0, translateY: 0, opacity: 1 },
  transition: { duration: DEFAULT_DURATION_X2, delay: DEFAULT_DURATION_X2_DELAY * mult },
});
