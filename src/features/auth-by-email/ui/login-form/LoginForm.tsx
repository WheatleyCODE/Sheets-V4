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
  const emailInput = useValidInput({ initValue: email, validators: [emailValidator] });
  const passwordInput = useValidInput({ initValue: password, validators: [passwordValidator] });
  const { t } = useTranslation('auth-modal');

  const isDisable = passwordInput.data.isError || emailInput.data.isError;

  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      emailInput.eventHandlers.onChange(e);
    },
    [emailInput, setEmail],
  );

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      passwordInput.eventHandlers.onChange(e);
    },
    [passwordInput, setPassword],
  );

  const onLogin = useCallback(async () => {
    if (emailInput.data.isError || passwordInput.data.isError) return;
    if (!emailInput.data.value || !passwordInput.data.value) return;

    onLoginStart?.();
    const data = { email: emailInput.data.value, password: passwordInput.data.value };
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
        type="text"
        placeholder={t('Почта')}
        data-testid="emailInput"
        {...emailInput.data}
        {...emailInput.dataChangers}
        {...emailInput.eventHandlers}
        validError={t(emailInput.data.validError || '')}
        onChange={onChangeEmail}
        inputRef={emailInput.ref}
      />

      <Input
        className={styles.input}
        Icon={MdOutlinePassword}
        type="password"
        placeholder={t('Пароль')}
        data-testid="passwordInput"
        {...passwordInput.data}
        {...passwordInput.dataChangers}
        {...passwordInput.eventHandlers}
        onChange={onChangePassword}
        validError={t(passwordInput.data.validError || '')}
        inputRef={passwordInput.ref}
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
