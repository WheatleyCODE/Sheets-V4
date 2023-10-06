import { FC, memo } from 'react';
import { classNames } from 'shared/lib/class-names';
import { TextSize, TextStyle } from '../interface';
import styles from './Text.module.scss';

interface ITextProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  text?: string;
  textStyle?: TextStyle;
  textSize?: TextSize;
}

export const Text: FC<ITextProps> = memo((props) => {
  const { className, title, text, textStyle = TextStyle.DEFAULT, textSize = TextSize.NORMAL, ...anotherProps } = props;

  return (
    <div
      {...anotherProps}
      data-testid="text"
      className={classNames(styles.text_container, { [styles[textStyle]]: true, [styles[textSize]]: true }, [
        className,
      ])}
    >
      {!!title && <p className={classNames(styles.title)}>{title}</p>}
      {!!text && <p className={classNames(styles.text)}>{text}</p>}
    </div>
  );
});
