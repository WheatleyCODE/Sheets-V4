import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateCodeBlock.module.scss';

interface ITemplateCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const TemplateCodeBlock: FC<ITemplateCodeBlockProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="templateCodeBlock" className={classNames(styles.template_code_block, {}, [className])}>
      TemplateCodeBlock 
    </div>
  );
};
