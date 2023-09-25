import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { MdPerson } from 'react-icons/md';
import styles from './User.module.scss';
import { TFunction } from 'i18next';

interface IUserProps extends React.HTMLAttributes<HTMLDivElement> {
  t: TFunction<'home'>;
}

export const User: FC<IUserProps> = (props) => {
  const { className, t, ...anotherProps } = props;

  return (
    <div {...anotherProps} className={classNames(styles.user, {}, [className])}>
      <Title text={t('Пользователь')}>
        <Button Icon={MdPerson} />
      </Title>
    </div>
  );
};
