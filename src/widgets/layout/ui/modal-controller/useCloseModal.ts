import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { modalsActions } from 'widgets/layout/model/slice/modalsSlice';
import { ModalsKeys } from 'widgets/layout/model/types/modalsSchema';
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
