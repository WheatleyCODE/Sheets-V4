import { FC } from 'react';
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md';
import { classNames } from 'shared/lib/class-names';
import { useTranslation } from 'react-i18next';
import { Input, useValidInput } from 'shared/ui/input';
import { emailValidator, passwordValidator } from 'shared/lib/validators';
import { Button } from 'shared/ui/button';
import styles from './LoginForm.module.scss';

interface ILoginFormProps {}

export const LoginForm: FC<ILoginFormProps> = () => {
  const { t } = useTranslation();
  const emailInput = useValidInput('', [emailValidator]);
  const passwordInput = useValidInput('', [passwordValidator]);

  const isDisable = passwordInput.isError || emailInput.isError;

  return (
    <div className={classNames(styles.login_form)}>
      <h1 className={styles.h1}>{t('Вход в систему')}</h1>

      <Input
        Icon={MdOutlineEmail}
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
        Icon={MdOutlinePassword}
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

      <Button disable={isDisable} className={styles.button} text={t('Войти')} />
    </div>
  );
};
