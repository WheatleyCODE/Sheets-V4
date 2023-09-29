import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './AuthModal.module.scss';
import { Backdrop } from 'shared/ui/backdrop/Backdrop';
import { Modal } from 'shared/ui/modal';
import { Input, useValidInput } from 'shared/ui/input';
import { Button } from 'shared/ui/button';

interface IAuthModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const AuthModal: FC<IAuthModalProps> = (props) => {
  const { className, onClose, ...anotherProps } = props;

  const emailInput = useValidInput('', [
    (a) => {
      if (a.length > 5) {
        return 'Ошибка';
      }

      return null;
    },
  ]);

  const passwordInput = useValidInput('', [
    (a) => {
      if (a.length > 5) {
        return 'Ошибка';
      }

      return null;
    },
  ]);

  return (
    <Backdrop onClose={onClose}>
      <Modal onClose={onClose}>
        <div data-testid="auth-modal" {...anotherProps} className={classNames(styles.auth_modal, {}, [className])}>
          <h1 className={styles.h1}>Вход в систему</h1>

          <Input
            value={emailInput.value}
            type="text"
            placeholder="Почта"
            onChange={emailInput.onChange}
            onBlur={emailInput.onBlur}
            onFocus={emailInput.onFocus}
            isError={emailInput.isError}
            validError={emailInput.validError}
            isActive={emailInput.isActive}
            className={styles.margin_bottom}
          />

          <Input
            value={passwordInput.value}
            type="password"
            placeholder="Пароль"
            onChange={passwordInput.onChange}
            onBlur={passwordInput.onBlur}
            onFocus={passwordInput.onFocus}
            isError={passwordInput.isError}
            validError={passwordInput.validError}
            isActive={passwordInput.isActive}
          />

          <Button className={styles.button} text="Войти" />
        </div>
      </Modal>
    </Backdrop>
  );
};
