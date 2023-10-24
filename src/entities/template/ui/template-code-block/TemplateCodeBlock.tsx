import { FC, memo } from 'react';
import { ITemplateCodeBlock } from '../../model/types/template';
import { Code } from 'shared/ui/code';
import { HStack } from 'shared/ui/containers';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateCodeBlock.module.scss';

interface ITemplateCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  block: ITemplateCodeBlock;
}

export const TemplateCodeBlock: FC<ITemplateCodeBlockProps> = memo((props) => {
  const { className, block, ...anotherProps } = props;
  const { code } = block;

  return (
    <HStack
      {...anotherProps}
      data-testid="templateCodeBlock"
      className={classNames(styles.template_code_block, {}, [className])}
    >
      <Code className={styles.code} code={code} />
    </HStack>
  );
});
