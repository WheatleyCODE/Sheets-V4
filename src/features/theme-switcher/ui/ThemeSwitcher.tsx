import { FC } from 'react';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { classNames } from 'shared/lib/class-names';
import styles from './ThemeSwitcher.module.scss';
import { useTheme } from 'app/providers';
import { TFunction } from 'i18next';

interface IThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  t: TFunction<'home'>;
}

export const ThemeSwitcher: FC<IThemeSwitcherProps> = (props) => {
  const { toggleTheme } = useTheme();
  const { className, t, ...anotherProps } = props;

  return (
    <div {...anotherProps} className={classNames(styles.switcher, {}, [className])}>
      <Title text={t('Сменить тему')}>
        <Button onClick={toggleTheme} text={t('Сменить тему')} />
      </Title>
    </div>
  );
};
