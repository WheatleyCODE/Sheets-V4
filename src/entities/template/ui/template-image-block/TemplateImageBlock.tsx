import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateImageBlock.module.scss';

interface ITemplateImageBlockProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const TemplateImageBlock: FC<ITemplateImageBlockProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="templateImageBlock" className={classNames(styles.template_image_block, {}, [className])}>
      TemplateImageBlock 
    </div>
  );
};
