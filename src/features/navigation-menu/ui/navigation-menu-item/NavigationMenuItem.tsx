import { FC, memo, useCallback } from 'react';
import { Text } from '@/shared/ui/text';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { HStack } from '@/shared/ui/containers';
import { sleep } from '@/shared/lib/promise';
import { Icon as IconComponent } from '@/shared/ui/icon';
import { ANIMATION_DURATION } from '@/shared/consts/animations/animation';
import { classNames } from '@/shared/lib/class-names';
import type { INavigationMenuItemProps } from './NavigationMenuItem.interface';
import styles from './NavigationMenuItem.module.scss';

export const NavigationMenuItem: FC<INavigationMenuItemProps> = memo((props) => {
  const { className, item, onClick, ...anotherProps } = props;
  const { Icon, path, text } = item;
  const navigate = useNavigate();
  const { t } = useTranslation('home');

  // ! FIX layout
  const onDelayClose = useCallback(async () => {
    onClick();
    await sleep(ANIMATION_DURATION);
    navigate(path);
  }, [onClick, navigate, path]);

  return (
    <HStack
      justify="start"
      {...anotherProps}
      data-testid="navigationMenuItem"
      onClick={onDelayClose}
      className={classNames(styles.item, {}, [className])}
    >
      <IconComponent Icon={Icon} className={styles.icon} />
      <Text className={styles.text} text={t(text)} />
    </HStack>
  );
});
