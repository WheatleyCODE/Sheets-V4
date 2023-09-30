import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { MdPerson } from 'react-icons/md';
import { IUser } from '../model/types/user';
import { useTranslation } from 'react-i18next';
import styles from './User.module.scss';

interface IUserProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: IUser;
  openAuth: () => void;
  logout: () => void;
}

export const User: FC<IUserProps> = (props) => {
  const { className, user, logout, openAuth, ...anotherProps } = props;
  const { t } = useTranslation();

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
