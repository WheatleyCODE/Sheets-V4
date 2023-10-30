import { ChangeEvent, FC, memo, useCallback } from 'react';
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Input, useValidInput } from 'shared/ui/input';
import { emailValidator, passwordValidator } from 'shared/lib/validators';
import { Button } from 'shared/ui/button';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByEmail } from '../../model/services/login-by-email/loginByEmail';
import { getLoginEmail } from '../../model/selectors/get-login-email/getLoginEmail';
import { getLoginPassword } from '../../model/selectors/get-login-password/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/get-login-is-loading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/get-login-error/getLoginError';
import { Text } from 'shared/ui/text';
import { TextStyle } from 'shared/ui/text';
import { TextSize } from 'shared/ui/text/ui/interface';
import { callOnFulfilled } from 'shared/lib/utils';
import { HStack, VStack } from 'shared/ui/containers';
import { ReducersList, useDynamicModule, useTypedDispatch } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/class-names';
import styles from './LoginForm.module.scss';

interface ILoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onLoginSuccess: () => void;
}

const reducers: ReducersList = { login: loginReducer };

const LoginForm: FC<ILoginFormProps> = memo((props) => {
  const { onLoginSuccess, ...anotherProps } = props;
  useDynamicModule(reducers);

  const email = useSelector(getLoginEmail);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  const emailInput = useValidInput(email, [emailValidator]);
  const passwordInput = useValidInput(password, [passwordValidator]);
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const isDisable = passwordInput.isError || emailInput.isError;

  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(loginActions.setEmail(e.target.value));
      emailInput.onChange(e);
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(loginActions.setPassword(e.target.value));
      passwordInput.onChange(e);
    },
    [dispatch],
  );

  const onLogin = useCallback(async () => {
    const data = { email: emailInput.value, password: passwordInput.value };
    const res = await dispatch(loginByEmail(data));
    callOnFulfilled(res, onLoginSuccess);
  }, [emailInput.value, passwordInput.value, dispatch, onLoginSuccess]);

  return (
    <VStack
      align="start"
      gapMultiply="6"
      {...anotherProps}
      data-testid="loginForm"
      className={classNames(styles.login_form)}
    >
      <Text textSize={TextSize.BIG} title={t('Вход в систему')} />

      <Input
        className={styles.input}
        Icon={MdOutlineEmail}
        value={emailInput.value}
        type="text"
        placeholder={t('Почта')}
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
          <Text textStyle={TextStyle.ERROR} text={error} />
        </HStack>
      )}
    </VStack>
  );
});

export default LoginForm;
