import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { useTheme } from 'app/providers';
import { classNames } from 'shared/lib/class-names';
import styles from './ThemeSwitcher.module.scss';

interface IThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ThemeSwitcher: FC<IThemeSwitcherProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div {...anotherProps} className={classNames(styles.switcher, {}, [className])}>
      <Title text={t('Сменить тему')}>
        <Button onClick={toggleTheme} text={t('Сменить тему')} />
      </Title>
    </div>
  );
};
