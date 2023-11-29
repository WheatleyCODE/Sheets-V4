import { FC, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthModal } from '@/widgets/auth-modal';
import { modalsActions } from '../../model/slice/modal/modalsSlice';
import { hashToStateKeys } from '../../model/consts/layout.consts';
import { useModalsIsAuth } from '../../model/selectors/modal/get-modals-is-auth/getModalsIsAuth';
import { useTypedDispatch } from '@/shared/lib/hooks';
import { useCloseModal } from './ModalController.hooks';

export const ModalController: FC = memo(() => {
  const dispatch = useTypedDispatch();
  const isAuth = useModalsIsAuth();
  const location = useLocation();

  const closeAuth = useCloseModal('isAuth');

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash;

      const key = hashToStateKeys[hash];
      if (!key) return;

      dispatch(modalsActions.openModalByKey(key));
    }
  }, [location.hash, dispatch]);

  return <AnimatePresence>{isAuth && <AuthModal onClose={closeAuth} />}</AnimatePresence>;
});
