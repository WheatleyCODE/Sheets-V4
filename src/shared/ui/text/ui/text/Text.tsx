import { FC, memo } from 'react';
import { TextSize, TextStyle } from './Text.consts';
import { classNames } from '@/shared/lib/class-names';
import type { ITextProps } from './Text.interface';
import styles from './Text.module.scss';

export const Text: FC<ITextProps> = memo((props) => {
  const {
    className,
    title,
    text,
    textTag: TextTag = 'p',
    titleTag: TitleTag = 'h2',
    textStyle = TextStyle.DEFAULT,
    textSize = TextSize.NORMAL,
    ...anotherProps
  } = props;

  return (
    <div
      {...anotherProps}
      data-testid="text"
      className={classNames(styles.text_container, { [styles[textStyle]]: true, [styles[textSize]]: true }, [
        className,
      ])}
    >
      {!!title && <TitleTag className={classNames(styles.title)}>{title}</TitleTag>}
      {!!text && <TextTag className={classNames(styles.text)}>{text}</TextTag>}
    </div>
  );
});
