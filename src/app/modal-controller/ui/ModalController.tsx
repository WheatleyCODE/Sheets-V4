import React, { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AuthModal } from 'widgets/auth-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getModalsIsAuth } from '../selectors/get-modals-is-auth/getModalsIsAuth';
import { modalActions } from '../slice/modalsSlice';

export const ModalController: FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getModalsIsAuth);
  // const navigate = useNavigate();
  // const location = useLocation();

  // const getClose = (key: any) => {
  //   return () => {
  //     // dispatch(modalsActions.changeIsModal({ key, boolean: false }));
  //     navigate(location.pathname);
  //   };
  // };

  // useEffect(() => {
  //   if (location.hash) {
  //     // const key = hashToStateKeys[location.hash];
  //     // if (!key) return;
  //     // dispatch(modalsActions.changeIsModal({ key, boolean: true }));
  //   }
  // }, []);

  const closeAuth = () => {
    dispatch(modalActions.closeModalByKey('isAuth'));
  };

  return <AnimatePresence>{isAuth && <AuthModal onClose={closeAuth} />}</AnimatePresence>;
};
