import { useCallback, useState } from 'react';

export const usePopups = () => {
  const [isShow, setIsShow] = useState(false);

  const togglePopup = useCallback(() => {
    setTimeout(() => setIsShow((p) => !p), 0);
  }, []);

  const closePopup = useCallback(() => {
    setTimeout(() => setIsShow(false), 0);
  }, []);

  const openPopup = useCallback(() => {
    setTimeout(() => setIsShow(true), 0);
  }, []);

  return {
    isShow,
    togglePopup,
    closePopup,
    openPopup,
  };
};
