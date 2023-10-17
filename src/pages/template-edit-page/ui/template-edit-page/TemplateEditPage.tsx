import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateEditPage.module.scss';
import { Layout } from 'widgets/layout';
import { useParams } from 'react-router-dom';

interface ITemplateEditPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const TemplateEditPage: FC<ITemplateEditPageProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const { t } = useTranslation();

  return (
    <Layout>
      <div
        {...anotherProps}
        data-testid="templateEditPage"
        className={classNames(styles.template_edit_page, {}, [className])}
      >
        TemplateEditPage
      </div>
    </Layout>
  );
};

export default TemplateEditPage;
