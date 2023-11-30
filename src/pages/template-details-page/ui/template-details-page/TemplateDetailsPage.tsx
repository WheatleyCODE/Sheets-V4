import { FC, memo } from 'react';
import { TemplateDetailsPageHeader } from '../template-details-page-header/TemplateDetailsPageHeader';
import { TemplateRecommends } from '@/widgets/template-recommends';
import { TemplateComments } from '@/widgets/template-comments';
import { TemplateRating } from '@/widgets/template-rating';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { TemplateDetailsPageMain } from '../template-details-page-main/TemplateDetailsPageMain';
import { classNames } from '@/shared/lib/class-names';
import styles from './TemplateDetailsPage.module.scss';

const TemplateDetailsPage: FC = memo(() => {
  // ? Можно написать Eslint rule для контроля шаблона использования

  // * Api template for use feature script
  // * See ./scripts/ts-morph/remove-features.ts
  const rating = toggleFeatures({
    name: 'isTemplateRating',
    on: () => <TemplateRating />,
    off: () => <div>{'Рейтинг в разработке'}</div>,
  });

  return (
    <section data-testid="templateDetailsPage" className={classNames(styles.template_details_page, {}, [])}>
      <TemplateDetailsPageHeader />
      <TemplateDetailsPageMain />
      {rating}

      {/* Api template for use feature script */}
      {/* See ./scripts/ts-morph/remove-features.ts */}
      <ToggleFeatures name="isTemplateRating" on={<div>{'on'}</div>} off={<div>{'off'}</div>} />

      <TemplateRecommends />
      <TemplateComments />
    </section>
  );
});

export default TemplateDetailsPage;
