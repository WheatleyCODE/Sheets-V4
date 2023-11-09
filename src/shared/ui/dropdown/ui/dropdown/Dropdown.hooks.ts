import { useState, useCallback } from 'react';

export const useDropdown = () => {
  const [isShow, setIsShow] = useState(false);

  const toggleDropdown = useCallback(() => {
    setTimeout(() => setIsShow((p) => !p), 0);
  }, []);

  const closeDropdown = useCallback(() => {
    setTimeout(() => setIsShow(false), 0);
  }, []);

  return {
    isShow,
    toggleDropdown,
    closeDropdown,
  };
};

export const useDropdownSubMenuAnimationFixer = (closeMenu: () => void, initialState = true) => {
  const [isHidden, setIsHidden] = useState(initialState);

  const closeContextMenu = () => {
    setIsHidden(true);
    closeMenu();
  };

  const onMouseEnter = () => {
    setIsHidden(false);
  };

  return { overflowStyles: { overflow: isHidden ? 'hidden' : 'visible' }, close: closeContextMenu, onMouseEnter };
};
