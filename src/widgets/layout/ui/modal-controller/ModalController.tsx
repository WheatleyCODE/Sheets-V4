import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthModal } from 'widgets/auth-modal';
import { modalsActions } from '../../model/slice/modalsSlice';
import { hashToStateKeys } from '../../consts/hashToStateKeys';
import { ModalsKeys } from '../../model/types/counterSchema';
import { getModalsIsAuth } from '../../model/selectors/get-modals-is-auth/getModalsIsAuth';

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
      const hash = location.hash.split('?')[0];

      const key = hashToStateKeys[hash];
      if (!key) return;

      dispatch(modalsActions.openModalByKey(key));
    }
  }, [location.hash, dispatch]);

  return <AnimatePresence>{isAuth && <AuthModal onClose={getCloseModal('isAuth')} />}</AnimatePresence>;
};
