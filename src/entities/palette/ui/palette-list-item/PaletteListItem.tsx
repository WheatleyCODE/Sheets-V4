import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import type { IPaletteListItemProps } from './PaletteListItem.interface';
import styles from './PaletteListItem.module.scss';

export const PaletteListItem: FC<IPaletteListItemProps> = (props) => {
  const { className, color, title, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div
      {...anotherProps}
      data-testid="paletteListItem"
      title={t(title)}
      style={{ background: color }}
      className={classNames(styles.palette_list_item, {}, [className])}
    />
  );
};
