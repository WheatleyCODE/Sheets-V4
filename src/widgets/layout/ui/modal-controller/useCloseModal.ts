import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTypedDispatch } from 'shared/lib/hooks/useTypedDispatch';
import { modalsActions } from 'widgets/layout/model/slice/modalsSlice';
import { ModalsKeys } from 'widgets/layout/model/types/counterSchema';

export const useCloseModal = (key: ModalsKeys) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(() => {
    dispatch(modalsActions.closeModalByKey(key));
    navigate(location.pathname);
  }, [dispatch, key, location.pathname, navigate]);
};
