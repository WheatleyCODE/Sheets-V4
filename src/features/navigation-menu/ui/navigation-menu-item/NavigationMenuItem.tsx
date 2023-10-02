import { FC, memo, useCallback } from 'react';
import { INavigationMenuItem } from '../../../navigation-menu/consts/navigationMenu';
import { Text } from 'shared/ui/text';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { sleep } from 'shared/lib/promises';
import { ANIMATION_DURATION } from 'shared/consts/animations/animation';
import { classNames } from 'shared/lib/class-names';
import styles from './NavigationMenuItem.module.scss';

interface INavigationMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: INavigationMenuItem;
  onClick: () => void;
}

export const NavigationMenuItem: FC<INavigationMenuItemProps> = memo((props) => {
  const { className, item, onClick, ...anotherProps } = props;
  const { Icon, path, text } = item;
  const navigate = useNavigate();
  const { t } = useTranslation('home');

  const MemoIcon = memo(Icon);

  // ! FIX layout
  const onDelayClose = useCallback(async () => {
    onClick();
    await sleep(ANIMATION_DURATION);
    navigate(path);
  }, [onClick, navigate, path]);

  return (
    <div {...anotherProps} onClick={onDelayClose} className={classNames(styles.item, {}, [className])}>
      <MemoIcon className={styles.icon} />
      <Text className={styles.text} text={t(text)} />
    </div>
  );
});
