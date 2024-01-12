import { FC } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { classNames } from '@/shared/lib/class-names';
import type { IFontFamilyProps } from './FontFamily.interface';
import styles from './FontFamily.module.scss';

export const FontFamily: FC<IFontFamilyProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="fontFamily" className={classNames(styles.font_family, {}, [className])}>
      <Button text={t('Шрифт')} Icon={MdArrowDropDown} />
    </div>
  );
};
