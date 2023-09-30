import { FC, useCallback } from 'react';
import { classNames } from 'shared/lib/class-names';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { MdPerson } from 'react-icons/md';
import styles from './User.module.scss';
import { TFunction } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { ModalsHash } from 'app/modal-controller';
import { IUser } from '../model/types/user';
import { KVFactory } from 'shared/lib/kv-storage';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from 'shared/consts/local-storage/localStorage';
import { userActions } from '../model/slice/userSlice';
import { useTypedDispatch } from 'shared/lib/hooks/useTypedDispatch';

interface IUserProps extends React.HTMLAttributes<HTMLDivElement> {
  t: TFunction<'home'>;
  user?: IUser;
}

export const User: FC<IUserProps> = (props) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { className, t, user, ...anotherProps } = props;

  const openAuth = useCallback(() => {
    navigate(ModalsHash.AUTH);
  }, [navigate]);

  const logout = useCallback(async () => {
    const ls = KVFactory(LS_DEFAULT_NAMESPACE);
    await ls.remove(LS_AUTH_KEY);
    dispatch(userActions.logout());
  }, [dispatch]);

  const isUser = !!user?.email;
  const buttonText = isUser ? t('Выйти') : t('Войти');
  const buttonCallback = isUser ? logout : openAuth;

  return (
    <div {...anotherProps} className={classNames(styles.user, {}, [className])}>
      <Title text={t('Пользователь')}>
        <Button text={buttonText} onClick={buttonCallback} Icon={MdPerson} />
      </Title>
    </div>
  );
};
