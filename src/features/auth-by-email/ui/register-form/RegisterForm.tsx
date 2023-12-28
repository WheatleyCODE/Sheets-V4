import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md';
import { classNames } from '@/shared/lib/class-names';
import { UseValidInputResult, Input, useValidInput } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { emailValidator, passwordValidator } from '@/shared/lib/validators';
import type { IRegisterFormProps } from './RegisterForm.interface';
import styles from './RegisterForm.module.scss';

const RegisterForm: FC<IRegisterFormProps> = memo((props) => {
  const { ...anotherProps } = props;
  const { t } = useTranslation('auth-modal');
  const emailInput = useValidInput({ initValue: '', validators: [emailValidator] });
  const passwordInput = useValidInput({ initValue: '', validators: [passwordValidator] });
  const repeatPasswordInput = useValidInput({ initValue: '', validators: [passwordValidator] });

  const isDisable = passwordInput.data.isError || emailInput.data.isError || repeatPasswordInput.data.isError;
  const isMismatch =
    passwordInput.data.value !== repeatPasswordInput.data.value &&
    passwordInput.data.isTouched &&
    repeatPasswordInput.data.isTouched;

  const getPasswordError = (input: UseValidInputResult) => {
    if (input.data.isError) return t(input.data.validError || '');
    if (isMismatch) return t('Пароли не совпадают');
    return null;
  };

  return (
    <div {...anotherProps} data-testid="registerForm" className={classNames(styles.register_form)}>
      <h1 className={styles.h1}>{t('Регистрация')}</h1>

      <Input
        Icon={MdOutlineEmail}
        type="text"
        placeholder={t('Почта')}
        {...emailInput.data}
        {...emailInput.dataChangers}
        {...emailInput.eventHandlers}
        ref={emailInput.ref}
        validError={t(emailInput.data.validError || '')}
        className={styles.margin_bottom}
      />

      <Input
        Icon={MdOutlinePassword}
        type="password"
        placeholder={t('Пароль')}
        {...passwordInput.data}
        {...passwordInput.dataChangers}
        {...passwordInput.eventHandlers}
        ref={passwordInput.ref}
        className={styles.margin_bottom}
        validError={getPasswordError(passwordInput)}
        isError={passwordInput.data.isError || isMismatch}
      />

      <Input
        Icon={MdOutlinePassword}
        type="password"
        placeholder={t('Повторите пароль')}
        {...repeatPasswordInput.data}
        {...repeatPasswordInput.dataChangers}
        {...repeatPasswordInput.eventHandlers}
        isError={repeatPasswordInput.data.isError || isMismatch}
        validError={getPasswordError(repeatPasswordInput)}
        ref={repeatPasswordInput.ref}
      />

      <Button disable={isDisable || isMismatch} className={styles.button} text={t('Регистрация')} />
    </div>
  );
});

export default RegisterForm;
