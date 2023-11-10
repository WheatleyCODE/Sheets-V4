import { FC, Suspense, memo, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ModalsHash } from '@/widgets/layout';
import { LoginFormAsync, RegisterFormAsync } from '@/features/auth-by-email';
import { Backdrop } from '@/shared/ui/backdrop';
import { Modal } from '@/shared/ui/modal';
import { Link } from '@/shared/ui/link';
import { LocationHelper } from '@/shared/lib/url';
import { Loader } from '@/shared/ui/loader';
import { HStack } from '@/shared/ui/containers';
import { classNames } from '@/shared/lib/class-names';
import type { IAuthModalProps } from './AuthModal.interface';
import styles from './AuthModal.module.scss';

export const AuthModal: FC<IAuthModalProps> = memo((props) => {
  const { className, onClose, ...anotherProps } = props;
  const [isRegister, setIsRegister] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLogin = new LocationHelper(location).hasParam('login');
    const isRegister = new LocationHelper(location).hasParam('register');

    if (!isLogin && !isRegister) {
      navigate(new LocationHelper(location).addHash(ModalsHash.AUTH).setParams({ login: true }).getPath());
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
    <Link
      className={styles.link}
      to={new LocationHelper(location).addHash(ModalsHash.AUTH).setParams({ login: true }).getPath()}
      onClick={toLogin}
    >
      {t('Войти')}
    </Link>
  ) : (
    <Link
      className={styles.link}
      to={new LocationHelper(location).addHash(ModalsHash.AUTH).setParams({ register: true }).getPath()}
      onClick={toRegister}
    >
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

          <HStack className={styles.links}>{link}</HStack>
        </div>
      </Modal>
    </Backdrop>
  );
});
