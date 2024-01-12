import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import type { ITextColorProps } from './TextColor.interface';
import styles from './TextColor.module.scss';
import { MdFormatColorText } from 'react-icons/md';
import { Button } from '@/shared/ui/button';

export const TextColor: FC<ITextColorProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="textColor" className={classNames(styles.text_color, {}, [className])}>
      <Button className="r-1px" Icon={MdFormatColorText} />
    </div>
  );
};
