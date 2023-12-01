import { FC, memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CircleLoader } from '@/shared/ui/loaders';
import { classNames } from '@/shared/lib/class-names';
import { Rating } from '@/entities/rating';
import { useUser } from '@/entities/user';
import { useRateTemplate, useTemplateRatings } from '../../api/templateRating.api';
import type { ITemplateRatingProps } from './TemplateRating.interface';
import styles from './TemplateRating.module.scss';

const TemplateRating: FC<ITemplateRatingProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const user = useUser();

  const { data, isLoading } = useTemplateRatings({ userId: user?.id ?? '', templateId: id ?? '' });
  const [rateArticle] = useRateTemplate();

  const rating = data?.[0];
  const isStarred = Boolean(rating);

  const rateTemplateHandler = useCallback(
    (rate: number, feedback?: string) => {
      try {
        rateArticle({
          userId: user?.id ?? '',
          templateId: id ?? '',
          rate,
          feedback,
        });
      } catch (e) {
        console.error(e);
      }
    },
    [id, rateArticle, user?.id],
  );

  if (isLoading) return <CircleLoader {...anotherProps} />;

  return (
    <div {...anotherProps} data-testid="templateRating" className={classNames(styles.template_rating, {}, [className])}>
      <Rating
        onCancel={rateTemplateHandler}
        onAccept={rateTemplateHandler}
        rate={rating?.rate}
        title={t('Оцените статью:')}
        feedbackTitle={t('Желаете оставить отзыв?')}
        isFeedback
        isStarred={isStarred}
      />
    </div>
  );
});

export default TemplateRating;
