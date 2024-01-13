import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MdFormatBold, MdFormatItalic, MdStrikethroughS } from 'react-icons/md';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { classNames } from '@/shared/lib/class-names';
import type { ITextStyleProps } from './TextStyle.interface';
import styles from './TextStyle.module.scss';

export const TextStyle: FC<ITextStyleProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="textStyle" className={classNames(styles.text_style, {}, [className])}>
      <Title text={t('Полужирный')}>
        <Button className="r-1px" Icon={MdFormatBold} />
      </Title>

      <Title text={t('Курсив')}>
        <Button className="r-1px" Icon={MdFormatItalic} />
      </Title>

      <Title text={t('Зачеркнутый текст')}>
        <Button Icon={MdStrikethroughS} />
      </Title>
    </div>
  );
};
