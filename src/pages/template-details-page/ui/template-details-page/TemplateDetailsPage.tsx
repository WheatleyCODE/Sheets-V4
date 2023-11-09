import { FC, memo } from 'react';
import { TemplateDetailsPageHeader } from '../template-details-page-header/TemplateDetailsPageHeader';
import { TemplateRecommends } from 'widgets/template-recommends/ui/template-recommends/TemplateRecommends';
import { TemplateComments } from 'widgets/template-comments/ui/template-comments/TemplateComments';
import { Layout } from 'widgets/layout';
import { TemplateDetailsPageMain } from '../template-details-page-main/TemplateDetailsPageMain';
import { classNames } from 'shared/lib/class-names';
import type { ITemplateDetailsPageProps } from './TemplateDetailsPage.interface';
import styles from './TemplateDetailsPage.module.scss';

const TemplateDetailsPage: FC<ITemplateDetailsPageProps> = memo((props) => {
  const { className, ...anotherProps } = props;

  return (
    <Layout>
      <section
        {...anotherProps}
        data-testid="templateDetailsPage"
        className={classNames(styles.template_details_page, {}, [className, 'page'])}
      >
        <TemplateDetailsPageHeader />
        <TemplateDetailsPageMain />
        <TemplateRecommends />
        <TemplateComments />
      </section>
    </Layout>
  );
});

export default TemplateDetailsPage;
