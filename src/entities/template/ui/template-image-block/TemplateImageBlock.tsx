import { FC, memo } from 'react';
import { ITemplateImageBlock } from '../../model/types/template';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateImageBlock.module.scss';
import { Image } from 'shared/ui/image';
import { Text, TextSize } from 'shared/ui/text';

interface ITemplateImageBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  block: ITemplateImageBlock;
}

export const TemplateImageBlock: FC<ITemplateImageBlockProps> = memo((props) => {
  const { className, block, ...anotherProps } = props;
  const { src, title } = block;

  return (
    <div
      {...anotherProps}
      data-testid="templateImageBlock"
      className={classNames(styles.template_image_block, {}, [className])}
    >
      <Image alt={title} className={styles.image} src={src} />

      {!!title && (
        <div>
          <Text textSize={TextSize.SMALL} title={title} />
        </div>
      )}
    </div>
  );
});
