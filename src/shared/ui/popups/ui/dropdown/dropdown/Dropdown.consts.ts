import { ANIMATION_DURATION } from '@/shared/consts';

export const dropdownAnimations = {
  get height() {
    return {
      exit: { height: 0 },
      animate: { height: 'auto' },
      initial: { height: 0 },
      transition: { duration: ANIMATION_DURATION },
    };
  },
};
