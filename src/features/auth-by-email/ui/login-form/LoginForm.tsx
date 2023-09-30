import { ChangeEvent, FC, memo, useCallback } from 'react';
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/class-names';
import { useTranslation } from 'react-i18next';
import { Input, useValidInput } from 'shared/ui/input';
import { emailValidator, passwordValidator } from 'shared/lib/validators';
import { Button } from 'shared/ui/button';
import { loginActions } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/get-login-state/getLoginState';
import { loginByEmail } from '../../model/services/login-by-email/loginByEmail';
import { useTypedDispatch } from 'shared/lib/hooks/useTypedDispatch';
import { Text } from 'shared/ui/text/Text';
import { TextStyle } from 'shared/ui/text';
import { TextSize } from 'shared/ui/text/interface';
import { callOnFulfilled } from 'shared/lib/utils';
import styles from './LoginForm.module.scss';

interface ILoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onLoginSuccess?: () => void;
}

export const LoginForm: FC<ILoginFormProps> = memo((props) => {
  const { onLoginSuccess, ...anotherProps } = props;
  const { email, password, isLoading, error } = useSelector(getLoginState);
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
      dispatch(loginActions.setEmail(e.target.value));
      passwordInput.onChange(e);
    },
    [dispatch],
  );

  const onLogin = useCallback(() => {
    const data = { email: emailInput.value, password: passwordInput.value };
    console.log(data);

    const promise = dispatch(loginByEmail(data));
    promise.then((a) => callOnFulfilled(a, onLoginSuccess));
  }, [emailInput.value, passwordInput.value, dispatch, onLoginSuccess]);

  return (
    <div {...anotherProps} className={classNames(styles.login_form)}>
      <Text textSize={TextSize.BIG} className={styles.title} title={t('Вход в систему')} />

      <Input
        Icon={MdOutlineEmail}
        value={emailInput.value}
        type="text"
        placeholder={t('Почта')}
        onChange={onChangeEmail}
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
        onChange={onChangePassword}
        onBlur={passwordInput.onBlur}
        onFocus={passwordInput.onFocus}
        isError={passwordInput.isError}
        validError={t(passwordInput.validError)}
        isActive={passwordInput.isActive}
      />

      <Button onClick={onLogin} disable={isDisable || isLoading} className={styles.button} text={t('Войти')} />

      {!!error && (
        <div className={styles.login_error}>
          <Text textStyle={TextStyle.ERROR} text={error} />
        </div>
      )}
    </div>
  );
});
