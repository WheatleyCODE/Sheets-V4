import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModalsActions } from '../../model/slice/modal/modalsSlice';
import { ModalsKeys } from '../../model/types/modal/modal.interface';

export const useCloseModal = (key: ModalsKeys) => {
  const { closeModalByKey } = useModalsActions();
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(() => {
    closeModalByKey(key);
    navigate(location.pathname);
  }, [closeModalByKey, key, location.pathname, navigate]);
};
