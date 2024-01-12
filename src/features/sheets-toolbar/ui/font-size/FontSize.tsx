import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MdAdd, MdRemove } from 'react-icons/md';
import { Button } from '@/shared/ui/button';
import { classNames } from '@/shared/lib/class-names';
import type { IFontSizeProps } from './FontSize.interface';
import styles from './FontSize.module.scss';

export const FontSize: FC<IFontSizeProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="fontSize" className={classNames(styles.font_size, {}, [className])}>
      <Button Icon={MdAdd} />
      <div className={styles.numbers}>10</div>
      <Button Icon={MdRemove} />
    </div>
  );
};
