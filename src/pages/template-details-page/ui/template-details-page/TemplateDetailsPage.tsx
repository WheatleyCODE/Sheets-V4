import { FC, memo } from 'react';
import { TemplateDetailsPageHeader } from '../template-details-page-header/TemplateDetailsPageHeader';
import { TemplateRecommends } from '@/widgets/template-recommends';
import { TemplateComments } from '@/widgets/template-comments';
import { Layout } from '@/widgets/layout';
import { TemplateRating } from '@/widgets/template-rating';
import { TemplateDetailsPageMain } from '../template-details-page-main/TemplateDetailsPageMain';
import { classNames } from '@/shared/lib/class-names';
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
        <TemplateRating />
        <TemplateRecommends />
        <TemplateComments />
      </section>
    </Layout>
  );
});

export default TemplateDetailsPage;
