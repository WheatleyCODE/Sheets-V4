import { FC, memo } from 'react';
import { Code } from '@/shared/ui/code';
import { HStack } from '@/shared/ui/containers';
import { classNames } from '@/shared/lib/class-names';
import type { ITemplateCodeBlockProps } from './TemplateCodeBlock.interface';
import styles from './TemplateCodeBlock.module.scss';
import { useTranslation } from 'react-i18next';

export const TemplateCodeBlock: FC<ITemplateCodeBlockProps> = memo((props) => {
  const { className, block, ...anotherProps } = props;
  const { t } = useTranslation('template-details');
  const { code } = block;

  return (
    <HStack
      {...anotherProps}
      data-testid="templateCodeBlock"
      className={classNames(styles.template_code_block, {}, [className])}
    >
      <Code copyText={t('Копировать')} className={styles.code} code={code} />
    </HStack>
  );
});
