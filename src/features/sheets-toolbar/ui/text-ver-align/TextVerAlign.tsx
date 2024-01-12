import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MdVerticalAlignBottom } from 'react-icons/md';
import { Button } from '@/shared/ui/button';
import { classNames } from '@/shared/lib/class-names';
import type { ITextVerAlignProps } from './TextVerAlign.interface';
import styles from './TextVerAlign.module.scss';

export const TextVerAlign: FC<ITextVerAlignProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="textVerAlign" className={classNames(styles.text_ver_align, {}, [className])}>
      <Button Icon={MdVerticalAlignBottom} />
    </div>
  );
};
