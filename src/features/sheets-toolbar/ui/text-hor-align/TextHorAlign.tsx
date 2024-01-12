import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MdFormatAlignLeft } from 'react-icons/md';
import { classNames } from '@/shared/lib/class-names';
import { Button } from '@/shared/ui/button';
import type { ITextHorAlignProps } from './TextHorAlign.interface';
import styles from './TextHorAlign.module.scss';

export const TextHorAlign: FC<ITextHorAlignProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="textHorAlign" className={classNames(styles.text_hor_align, {}, [className])}>
      <Button className="r-1px" Icon={MdFormatAlignLeft} />
    </div>
  );
};
