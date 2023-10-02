import { FC, Suspense, memo, useCallback, useEffect, useState } from 'react';
import { Backdrop } from 'shared/ui/backdrop/Backdrop';
import { Modal } from 'shared/ui/modal';
import { LoginFormAsync, RegisterFormAsync } from 'features/auth-by-email';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'shared/ui/link';
import { ModalsHash } from 'widgets/layout';
import { useTranslation } from 'react-i18next';
import { findParam, addParam } from 'shared/lib/paths';
import { classNames } from 'shared/lib/class-names';
import styles from './AuthModal.module.scss';
import { Loader } from 'shared/ui/loader';

interface IAuthModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const AuthModal: FC<IAuthModalProps> = memo((props) => {
  const { className, onClose, ...anotherProps } = props;
  const [isRegister, setIsRegister] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLogin = findParam(location.hash, 'login');
    const isRegister = findParam(location.hash, 'register');

    if (!isLogin && !isRegister) {
      navigate(addParam(ModalsHash.AUTH, 'login', true));
      return;
    }

    if (isRegister) {
      setIsRegister(true);
    }
  }, []);

  const toLogin = useCallback(() => {
    setIsRegister(false);
  }, []);

  const toRegister = useCallback(() => {
    setIsRegister(true);
  }, []);

  const link = isRegister ? (
    <Link className={styles.link} to={addParam(ModalsHash.AUTH, 'login', true)} onClick={toLogin}>
      {t('Войти')}
    </Link>
  ) : (
    <Link className={styles.link} to={addParam(ModalsHash.AUTH, 'register', true)} onClick={toRegister}>
      {t('Регистрация')}
    </Link>
  );

  return (
    <Backdrop onClose={onClose}>
      <Modal onClose={onClose}>
        <div data-testid="auth-modal" {...anotherProps} className={classNames(styles.auth_modal, {}, [className])}>
          <Suspense fallback={<Loader isCenter />}>
            {isRegister ? <RegisterFormAsync /> : <LoginFormAsync onLoginSuccess={onClose} />}
          </Suspense>
          <div className={styles.links}>{link}</div>
        </div>
      </Modal>
    </Backdrop>
  );
});
