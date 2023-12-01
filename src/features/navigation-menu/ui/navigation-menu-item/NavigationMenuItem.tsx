import { FC, memo, useCallback } from 'react';
import { Text } from '@/shared/ui/text';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { HStack } from '@/shared/ui/containers';
import { Icon as IconComponent } from '@/shared/ui/icon';
import { classNames } from '@/shared/lib/class-names';
import type { INavigationMenuItemProps } from './NavigationMenuItem.interface';
import styles from './NavigationMenuItem.module.scss';

export const NavigationMenuItem: FC<INavigationMenuItemProps> = memo((props) => {
  const { className, item, onClick, ...anotherProps } = props;
  const { Icon, path, text } = item;
  const navigate = useNavigate();
  const { t } = useTranslation('home');

  const onClose = useCallback(async () => {
    onClick();
    console.log('dsddsadd');
    navigate(path);
  }, [onClick, navigate, path]);

  return (
    <HStack
      justify="start"
      {...anotherProps}
      data-testid="navigationMenuItem"
      onClick={onClose}
      className={classNames(styles.item, {}, [className])}
    >
      <IconComponent Icon={Icon} className={styles.icon} />
      <Text className={styles.text} text={t(text)} />
    </HStack>
  );
});
