import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthModal } from 'widgets/auth-modal';
import { modalsActions } from '../../model/slice/modalsSlice';
import { hashToStateKeys } from '../../consts/hashToStateKeys';
import { getModalsIsAuth } from '../../model/selectors/get-modals-is-auth/getModalsIsAuth';
import { useTypedDispatch } from 'shared/lib/hooks';
import { useCloseModal } from './useCloseModal';

export const ModalController: FC = memo(() => {
  const dispatch = useTypedDispatch();
  const isAuth = useSelector(getModalsIsAuth);
  const location = useLocation();

  const closeAuth = useCloseModal('isAuth');

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.split('?')[0];

      const key = hashToStateKeys[hash];
      if (!key) return;

      dispatch(modalsActions.openModalByKey(key));
    }
  }, [location.hash, dispatch]);

  return <AnimatePresence>{isAuth && <AuthModal onClose={closeAuth} />}</AnimatePresence>;
});
