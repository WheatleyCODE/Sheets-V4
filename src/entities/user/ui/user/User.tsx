import { FC, memo } from 'react';
import { MdPerson } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../model/types/user';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { classNames } from 'shared/lib/class-names';
import styles from './User.module.scss';

interface IUserProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: IUser;
  openAuth: () => void;
  logout: () => void;
}

export const User: FC<IUserProps> = memo((props) => {
  const { className, user, logout, openAuth, ...anotherProps } = props;
  const { t } = useTranslation();

  const isUser = !!user?.email;
  const buttonText = isUser ? t('Выйти') : t('Войти');
  const buttonCallback = isUser ? logout : openAuth;

  return (
    <div {...anotherProps} data-testid="logo" className={classNames(styles.user, {}, [className])}>
      <Title text={t('Пользователь')}>
        <Button text={buttonText} onClick={buttonCallback} Icon={MdPerson} />
      </Title>
    </div>
  );
});
