import { useCallback, useState } from 'react';

export const useModals = () => {
  const [isShow, setIsShow] = useState(false);

  const toggleModal = useCallback(() => {
    setIsShow((p) => !p);
  }, []);

  const closeModal = useCallback(() => {
    setIsShow(false);
  }, []);

  const openModal = useCallback(() => {
    setIsShow(true);
  }, []);

  return {
    isShow,
    toggleModal,
    closeModal,
    openModal,
  };
};
