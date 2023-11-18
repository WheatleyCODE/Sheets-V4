export enum DrawerOpenStyles {
  RIGHT = 'right',
  LEFT = 'left',
  TOP = 'top',
  BOTTOM = 'bottom',
}

const drawerAnimations = {
  right(width: number) {
    return {
      initial: {
        translateX: width,
        borderRadius: '10% 0 0 10%',
      },
      exit: {
        translateX: width,
        borderRadius: '10% 0 0 10%',
      },
      animate: { translateX: 0, borderRadius: 0 },
    };
  },

  left(width: number) {
    return {
      initial: {
        translateX: -width,
        borderRadius: '0 10% 10% 0',
      },
      exit: {
        translateX: -width,
        borderRadius: '0 10% 10% 0',
      },
      animate: { translateX: 0, borderRadius: 0 },
    };
  },

  top(width: number) {
    return {
      initial: {
        translateY: -width,
      },
      exit: {
        translateY: -width,
      },
      animate: { translateY: 0 },
    };
  },

  bottom(width: number) {
    return {
      initial: {
        translateY: width,
      },
      exit: {
        translateY: width,
      },
      animate: { translateY: 0 },
    };
  },
};

export const getDrawerAnimations = (open: 'right' | 'left' | 'top' | 'bottom', width: number) => {
  return drawerAnimations[open](width);
};
