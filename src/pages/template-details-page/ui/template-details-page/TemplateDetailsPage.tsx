import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateDetailsPage.module.scss';

interface ITemplateDetailsPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const TemplateDetailsPage: FC<ITemplateDetailsPageProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div
      {...anotherProps}
      data-testid="templateDetailsPage"
      className={classNames(styles.template_details_page, {}, [className, 'page'])}
    >
      TemplateDetailsPage
    </div>
  );
});

export default TemplateDetailsPage;
