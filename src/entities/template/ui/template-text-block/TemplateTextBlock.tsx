import { FC, memo } from 'react';
import { ITemplateTextBlock } from '../../model/types/template';
import { Text } from 'shared/ui/text';
import { intoIter } from 'shared/lib/iterators';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateTextBlock.module.scss';
interface ITemplateTextBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  block: ITemplateTextBlock;
}

export const TemplateTextBlock: FC<ITemplateTextBlockProps> = memo((props) => {
  const { className, block, ...anotherProps } = props;
  const { paragraphs, title } = block;

  const textArr = intoIter<string>(paragraphs)
    .map((text) => <Text key={text.length} className={styles.text} text={text} />)
    .toArray();

  return (
    <div
      {...anotherProps}
      data-testid="templateTextBlock"
      className={classNames(styles.template_text_block, {}, [className])}
    >
      {!!title && (
        <div className={styles.title_row}>
          <Text className={styles.title} title={title} />
        </div>
      )}

      <div className={styles.text_row}>{textArr}</div>
    </div>
  );
});
