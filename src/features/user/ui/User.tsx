import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { MdPerson } from 'react-icons/md';
import styles from './User.module.scss';
import { TFunction } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { ModalsHash } from 'app/modal-controller';

interface IUserProps extends React.HTMLAttributes<HTMLDivElement> {
  t: TFunction<'home'>;
}

export const User: FC<IUserProps> = (props) => {
  const navigate = useNavigate();
  const { className, t, ...anotherProps } = props;

  const openAuth = () => {
    navigate(ModalsHash.AUTH);
  };

  return (
    <div {...anotherProps} className={classNames(styles.user, {}, [className])}>
      <Title text={t('Пользователь')}>
        <Button onClick={openAuth} square Icon={MdPerson} />
      </Title>
    </div>
  );
};
