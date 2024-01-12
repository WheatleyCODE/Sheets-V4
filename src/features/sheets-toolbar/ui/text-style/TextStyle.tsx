import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import type { ITextStyleProps } from './TextStyle.interface';
import styles from './TextStyle.module.scss';
import { Button } from '@/shared/ui/button';
import { MdFormatBold, MdFormatItalic, MdStrikethroughS } from 'react-icons/md';

export const TextStyle: FC<ITextStyleProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="textStyle" className={classNames(styles.text_style, {}, [className])}>
      <Button className="r-1px" Icon={MdFormatBold} />
      <Button className="r-1px" Icon={MdFormatItalic} />
      <Button Icon={MdStrikethroughS} />
    </div>
  );
};
