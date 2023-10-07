import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/button';
import { classNames } from 'shared/lib/class-names';
import styles from './Code.module.scss';

interface ICodeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

export const Code: FC<ICodeProps> = (props) => {
  const { className, text, ...anotherProps } = props;
  const { t } = useTranslation();

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <div {...anotherProps} data-testid="code" className={classNames(styles.code, {}, [className])}>
      <pre>
        <Button onClick={onCopy} className={styles.copy_button} text={t('Скопировать')} />
        <code>{text}</code>
      </pre>
    </div>
  );
};
