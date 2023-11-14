import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import type { ITemplateRatingProps } from './TemplateRating.interface';
import styles from './TemplateRating.module.scss';
import { Rating } from '@/entities/rating';

export const TemplateRating: FC<ITemplateRatingProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="templateRating" className={classNames(styles.template_rating, {}, [className])}>
      <Rating title={t('Оцените статью:')} feedbackTitle={t('Желаете оставить отзыв?')} isFeedback />
    </div>
  );
};
