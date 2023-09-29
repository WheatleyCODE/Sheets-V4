import { FC, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AuthModal } from 'widgets/auth-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getModalsIsAuth } from '../selectors/get-modals-is-auth/getModalsIsAuth';
import { modalsActions } from '../slice/modalsSlice';
import { hashToStateKeys } from '../consts/hashToStateKeys';
import { ModalsKeys } from '../types/counterSchema';
import { useLocation, useNavigate } from 'react-router-dom';

export const ModalController: FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getModalsIsAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const getCloseModal = (key: ModalsKeys) => {
    return () => {
      dispatch(modalsActions.closeModalByKey(key));
      navigate(location.pathname);
    };
  };

  useEffect(() => {
    if (location.hash) {
      const key = hashToStateKeys[location.hash];
      if (!key) return;

      dispatch(modalsActions.openModalByKey(key));
    }
  }, [location.hash, dispatch]);

  return <AnimatePresence>{isAuth && <AuthModal onClose={getCloseModal('isAuth')} />}</AnimatePresence>;
};
