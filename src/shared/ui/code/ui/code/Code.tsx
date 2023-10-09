import { FC, useCallback } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { Button, ButtonStyles } from 'shared/ui/button';
import { classNames } from 'shared/lib/class-names';
import styles from './Code.module.scss';

interface ICodeProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
}

export const Code: FC<ICodeProps> = (props) => {
  const { className, code, ...anotherProps } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <div {...anotherProps} data-testid="code" className={classNames(styles.code, {}, [className])}>
      <div className={styles.copy_button_container}>
        <Button
          className={styles.copy_button}
          Icon={MdOutlineContentCopy}
          circle
          buttonStyle={ButtonStyles.CLEAR}
          onClick={onCopy}
        />
      </div>

      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};