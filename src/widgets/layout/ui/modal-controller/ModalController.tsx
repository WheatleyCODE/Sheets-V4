import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// ! FIX Circular dependency
// import { AuthModal } from 'widgets/auth-modal';
import { modalsActions } from '../../model/slice/modal/modalsSlice';
import { hashToStateKeys } from '../../model/consts/layout.consts';
import { getModalsIsAuth } from '../../model/selectors/modal/get-modals-is-auth/getModalsIsAuth';
import { useTypedDispatch } from '@/shared/lib/hooks';
import { useCloseModal } from './ModalController.hooks';

export const ModalController: FC = memo(() => {
  const dispatch = useTypedDispatch();
  const isAuth = useSelector(getModalsIsAuth);
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

  // ! FIX Circular dependency
  // return <AnimatePresence>{isAuth && <AuthModal onClose={closeAuth} />}</AnimatePresence>;
  return <AnimatePresence>{isAuth && <div>12345</div>}</AnimatePresence>;
});
