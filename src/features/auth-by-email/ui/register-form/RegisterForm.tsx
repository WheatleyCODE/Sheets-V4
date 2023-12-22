import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md';
import { classNames } from '@/shared/lib/class-names';
import { UseValidInputResult, Input, useValidInput } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
// import { emailValidator, passwordValidator } from '@/shared/lib/validators';
import type { IRegisterFormProps } from './RegisterForm.interface';
import styles from './RegisterForm.module.scss';

// ! FIX
const RegisterForm: FC<IRegisterFormProps> = memo((props) => {
  const { ...anotherProps } = props;
  const { t } = useTranslation('auth-modal');
  // const emailInput = useValidInput({ input: { initialValue: '', validators: [emailValidator] } });
  // const passwordInput = useValidInput({ input: { initialValue: '', validators: [passwordValidator] } });
  // const repeatPasswordInput = useValidInput({ input: { initialValue: '', validators: [passwordValidator] } });

  const emailInput = useValidInput();
  const passwordInput = useValidInput();
  const repeatPasswordInput = useValidInput();

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
        // {...emailInput.data}
        // {...emailInput.handlers}
        // validError={t(emailInput.data.validError || '')}
        data={emailInput.data}
        dataChangers={emailInput.dataChangers}
        eventHandlers={emailInput.eventHandlers}
        ref={emailInput.ref}
        className={styles.margin_bottom}
      />

      <Input
        Icon={MdOutlinePassword}
        type="password"
        placeholder={t('Пароль')}
        // {...passwordInput.data}
        // {...passwordInput.handlers}
        // validError={getPasswordError(passwordInput)}
        // isError={passwordInput.data.isError || isMismatch}
        data={passwordInput.data}
        dataChangers={passwordInput.dataChangers}
        eventHandlers={passwordInput.eventHandlers}
        ref={passwordInput.ref}
        className={styles.margin_bottom}
      />

      <Input
        Icon={MdOutlinePassword}
        type="password"
        placeholder={t('Повторите пароль')}
        // {...repeatPasswordInput.data}
        // {...repeatPasswordInput.handlers}
        // isError={repeatPasswordInput.data.isError || isMismatch}
        // validError={getPasswordError(repeatPasswordInput)}
        data={repeatPasswordInput.data}
        dataChangers={repeatPasswordInput.dataChangers}
        eventHandlers={repeatPasswordInput.eventHandlers}
        ref={repeatPasswordInput.ref}
      />

      <Button disable={isDisable || isMismatch} className={styles.button} text={t('Регистрация')} />
    </div>
  );
});

export default RegisterForm;
