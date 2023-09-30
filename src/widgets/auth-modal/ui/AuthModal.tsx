import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/class-names';
import { Backdrop } from 'shared/ui/backdrop/Backdrop';
import { Modal } from 'shared/ui/modal';
import { LoginForm, RegisterForm } from 'features/auth-by-email';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './AuthModal.module.scss';
import { Link } from 'shared/ui/link';
import { useTranslation } from 'react-i18next';
interface IAuthModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const AuthModal: FC<IAuthModalProps> = (props) => {
  const { className, onClose, ...anotherProps } = props;
  const [isRegister, setIsRegister] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // ! FIX
  useEffect(() => {
    const strArr = location.hash.split('?');

    if (strArr.length === 1) {
      navigate('/#auth?login=true');
      return;
    }

    const register = strArr.pop().split('=')[0];

    if (register === 'register') {
      setIsRegister(true);
    }
  }, []);

  const toLogin = () => {
    setIsRegister(false);
  };

  const toRegister = () => {
    setIsRegister(true);
  };

  const link = isRegister ? (
    <Link to="/#auth?login=true" onClick={toLogin}>
      {t('Войти')}
    </Link>
  ) : (
    <Link to="/#auth?register=true" onClick={toRegister}>
      {t('Регистрация')}
    </Link>
  );

  return (
    <Backdrop onClose={onClose}>
      <Modal onClose={onClose}>
        <div data-testid="auth-modal" {...anotherProps} className={classNames(styles.auth_modal, {}, [className])}>
          {isRegister ? <RegisterForm /> : <LoginForm />}
          <div className={styles.links}>{link}</div>
        </div>
      </Modal>
    </Backdrop>
  );
};
