import { ChangeEvent, FC, memo, useCallback } from 'react';
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Input, useValidInput } from '@/shared/ui/input';
import { emailValidator, passwordValidator } from '@/shared/lib/validators';
import { Button } from '@/shared/ui/button';
import { loginReducer, useLoginActions } from '../../model/slice/loginSlice';
import { useLoginByEmail } from '../../model/services/login-by-email/loginByEmail';
import { useLoginEmail } from '../../model/selectors/get-login-email/getLoginEmail';
import { useLoginPassword } from '../../model/selectors/get-login-password/getLoginPassword';
import { useLoginIsLoading } from '../../model/selectors/get-login-is-loading/getLoginIsLoading';
import { useLoginError } from '../../model/selectors/get-login-error/getLoginError';
import { Text } from '@/shared/ui/text';
import { callOnFulfilled } from '@/shared/lib/utils';
import { HStack, VStack } from '@/shared/ui/containers';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { ILoginFormProps } from './LoginForm.interface';
import styles from './LoginForm.module.scss';

const reducers: ReducersList = { login: loginReducer };

const LoginForm: FC<ILoginFormProps> = memo((props) => {
  const { onLoginSuccess, onLoginStart, ...anotherProps } = props;
  useDynamicModule(reducers);

  const loginByEmail = useLoginByEmail();
  const { setEmail, setPassword } = useLoginActions();
  const email = useLoginEmail();
  const password = useLoginPassword();
  const isLoading = useLoginIsLoading();
  const error = useLoginError();
  const emailInput = useValidInput(email, [emailValidator]);
  const passwordInput = useValidInput(password, [passwordValidator]);
  const { t } = useTranslation();

  const isDisable = passwordInput.isError || emailInput.isError;

  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      emailInput.onChange(e);
    },
    [emailInput, setEmail],
  );

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      passwordInput.onChange(e);
    },
    [passwordInput, setPassword],
  );

  const onLogin = useCallback(async () => {
    if (emailInput.isError || passwordInput.isError) return;
    if (!emailInput.value || !passwordInput.value) return;

    onLoginStart?.();
    const data = { email: emailInput.value, password: passwordInput.value };
    const res = await loginByEmail(data);
    callOnFulfilled(res, onLoginSuccess);
  }, [emailInput, passwordInput, loginByEmail, onLoginSuccess, onLoginStart]);

  return (
    <VStack
      align="start"
      gapMultiply="6"
      {...anotherProps}
      data-testid="loginForm"
      className={classNames(styles.login_form)}
    >
      <Text textSize="big" title={t('Вход в систему')} />

      <Input
        className={styles.input}
        Icon={MdOutlineEmail}
        value={emailInput.value}
        type="text"
        placeholder={t('Почта')}
        data-testid="emailInput"
        onChange={onChangeEmail}
        onBlur={emailInput.onBlur}
        onFocus={emailInput.onFocus}
        isError={emailInput.isError}
        validError={t(emailInput.validError || '')}
        isActive={emailInput.isActive}
      />

      <Input
        className={styles.input}
        Icon={MdOutlinePassword}
        value={passwordInput.value}
        type="password"
        placeholder={t('Пароль')}
        data-testid="passwordInput"
        onChange={onChangePassword}
        onBlur={passwordInput.onBlur}
        onFocus={passwordInput.onFocus}
        isError={passwordInput.isError}
        validError={t(passwordInput.validError || '')}
        isActive={passwordInput.isActive}
      />

      <Button onClick={onLogin} disable={isDisable || isLoading} className={styles.button} text={t('Войти')} />

      {!!error && (
        <HStack className={styles.login_error}>
          <Text textStyle="error" text={error} />
        </HStack>
      )}
    </VStack>
  );
});

export default LoginForm;
