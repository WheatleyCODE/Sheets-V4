import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import { IValidInputOpts, Input, useValidInput } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { emailValidator, passwordValidator } from 'shared/lib/validators';
import { useTranslation } from 'react-i18next';
import styles from './RegisterForm.module.scss';

interface IRegisterFormProps {}

export const RegisterForm: FC<IRegisterFormProps> = () => {
  const { t } = useTranslation();
  const emailInput = useValidInput('', [emailValidator]);
  const passwordInput = useValidInput('', [passwordValidator]);
  const repeatPasswordInput = useValidInput('', [passwordValidator]);

  const isDisable = passwordInput.isError || emailInput.isError || repeatPasswordInput.isError;
  const isMismatch =
    passwordInput.value !== repeatPasswordInput.value && passwordInput.isTouched && repeatPasswordInput.isTouched;

  const getPasswordError = (input: IValidInputOpts<string>) => {
    if (input.isError) return t(input.validError);
    if (isMismatch) return t('Пароли не совпадают');
  };

  return (
    <div className={classNames(styles.register_form)}>
      <h1 className={styles.h1}>{t('Регистрация')}</h1>

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
        isError={passwordInput.isError || isMismatch}
        validError={getPasswordError(passwordInput)}
        isActive={passwordInput.isActive}
        className={styles.margin_bottom}
      />

      <Input
        value={repeatPasswordInput.value}
        type="password"
        placeholder={t('Повторите пароль')}
        onChange={repeatPasswordInput.onChange}
        onBlur={repeatPasswordInput.onBlur}
        onFocus={repeatPasswordInput.onFocus}
        isError={repeatPasswordInput.isError || isMismatch}
        validError={getPasswordError(repeatPasswordInput)}
        isActive={repeatPasswordInput.isActive}
      />

      <Button disable={isDisable || isMismatch} className={styles.button} text={t('Регистрация')} />
    </div>
  );
};