import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { templateRecommendsReducer } from '../../model/slice/templateRecommendsSlice';
import { fetchTemplateRecommends } from '../../model/services/fetch-template-recommends/fetchTemplateRecommends';
import { useTemplateRecommendsError } from '../../model/selectors/get-template-recommends-error/getTemplateRecommendsError';
import { useTemplateRecommendsIsLoading } from '../../model/selectors/get-template-recommends-is-loading/getTemplateRecommendsIsLoading';
import { useTemplateRecommendsSelectAll } from '../../model/selectors/get-template-recommends/getTemplateRecommends';
import { TemplateList } from '@/entities/template';
import { useDynamicModule, useTypedDispatch, ReducersList, useInitialEffect } from '@/shared/lib/hooks';
import { RWidth } from '@/shared/ui/containers';
import { Text } from '@/shared/ui/text';
import { classNames } from '@/shared/lib/class-names';
import type { ITemplateRecommendsProps } from './TemplateRecommends.interface';
import styles from './TemplateRecommends.module.scss';

const reducers: ReducersList = { templateRecommends: templateRecommendsReducer };

export const TemplateRecommends: FC<ITemplateRecommendsProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers, true);

  const dispatch = useTypedDispatch();
  const recommends = useTemplateRecommendsSelectAll();
  const recommendsError = useTemplateRecommendsError();
  const recommendsIsLoading = useTemplateRecommendsIsLoading();
  const { t } = useTranslation('template-details');

  useInitialEffect(() => {
    dispatch(fetchTemplateRecommends());
  });

  return (
    <RWidth
      data-testid="templateRecommends"
      maxWidth="template"
      {...anotherProps}
      className={classNames(styles.template_recommends, {}, [className])}
    >
      <Text title={`${t('Рекомендуем')}:`} />
      <TemplateList
        isOpenInNewWindow={true}
        templates={recommends}
        isLoading={recommendsIsLoading}
        error={recommendsError}
      />
    </RWidth>
  );
});
