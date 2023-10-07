import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateTextBlock.module.scss';

interface ITemplateTextBlockProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const TemplateTextBlock: FC<ITemplateTextBlockProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="templateTextBlock" className={classNames(styles.template_text_block, {}, [className])}>
      TemplateTextBlock 
    </div>
  );
};
