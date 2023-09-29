import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import { Backdrop } from 'shared/ui/backdrop/Backdrop';
import { Modal } from 'shared/ui/modal';
import { Input, useValidInput } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { emailValidator, passwordValidator } from 'shared/lib/validators';
import { useTranslation } from 'react-i18next';
import styles from './AuthModal.module.scss';

interface IAuthModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const AuthModal: FC<IAuthModalProps> = (props) => {
  const { className, onClose, ...anotherProps } = props;
  const { t } = useTranslation();
  const emailInput = useValidInput('', [emailValidator]);
  const passwordInput = useValidInput('', [passwordValidator]);

  return (
    <Backdrop onClose={onClose}>
      <Modal onClose={onClose}>
        <div data-testid="auth-modal" {...anotherProps} className={classNames(styles.auth_modal, {}, [className])}>
          <h1 className={styles.h1}>{t('Вход в систему')}</h1>

          <Input
            value={emailInput.value}
            type="text"
            placeholder={t('Почта')}
            onChange={emailInput.onChange}
            onBlur={emailInput.onBlur}
            onFocus={emailInput.onFocus}
            isError={emailInput.isError}
            validError={t(emailInput.validError)}
            isActive={emailInput.isActive}
            className={styles.margin_bottom}
          />

          <Input
            value={passwordInput.value}
            type="password"
            placeholder={t('Пароль')}
            onChange={passwordInput.onChange}
            onBlur={passwordInput.onBlur}
            onFocus={passwordInput.onFocus}
            isError={passwordInput.isError}
            validError={t(passwordInput.validError)}
            isActive={passwordInput.isActive}
          />

          <Button disable={passwordInput.isError || emailInput.isError} className={styles.button} text={t('Войти')} />
        </div>
      </Modal>
    </Backdrop>
  );
};
