import { FC, memo, useCallback } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { Button } from '../../../button';
import { Title } from '../../../title';
import { classNames } from '@/shared/lib/class-names';
import type { ICodeProps } from './Code.interface';
import styles from './Code.module.scss';

export const Code: FC<ICodeProps> = memo((props) => {
  const { className, code, copyText = 'Копировать', ...anotherProps } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <div {...anotherProps} data-testid="code" className={classNames(styles.code, {}, [className])}>
      <div className={styles.copy_button_container}>
        <Title forcePosition="bottom-right" text={copyText}>
          <Button
            className={styles.copy_button}
            Icon={MdOutlineContentCopy}
            circle
            buttonStyle="clear"
            onClick={onCopy}
          />
        </Title>
      </div>

      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
});
