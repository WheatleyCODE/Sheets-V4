import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplatesPage.module.scss';

interface ITemplatesPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const TemplatesPage: FC<ITemplatesPageProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation('templates');

  return (
    <div
      {...anotherProps}
      data-testid="templatesPage"
      className={classNames(styles.templates_page, {}, [className, 'page'])}
    >
      TemplatesPage
    </div>
  );
});

export default TemplatesPage;
