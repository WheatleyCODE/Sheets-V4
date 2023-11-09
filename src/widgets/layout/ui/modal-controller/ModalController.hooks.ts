import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { modalsActions } from '../../model/slice/modal/modalsSlice';
import { ModalsKeys } from '../../model/types/modal/modal.interface';
import { useTypedDispatch } from 'shared/lib/hooks';

export const useCloseModal = (key: ModalsKeys) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(() => {
    dispatch(modalsActions.closeModalByKey(key));
    navigate(location.pathname);
  }, [dispatch, key, location.pathname, navigate]);
};
