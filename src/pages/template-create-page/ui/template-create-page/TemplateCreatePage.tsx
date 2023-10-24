import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateCreatePage.module.scss';
import { Layout } from 'widgets/layout';

interface ITemplateCreatePageProps extends React.HTMLAttributes<HTMLDivElement> {}

const TemplateCreatePage: FC<ITemplateCreatePageProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <Layout>
      <section
        {...anotherProps}
        data-testid="templateCreatePage"
        className={classNames(styles.template_create_page, {}, [className])}
      >
        TemplateCreatePage
      </section>
    </Layout>
  );
};

export default TemplateCreatePage;
