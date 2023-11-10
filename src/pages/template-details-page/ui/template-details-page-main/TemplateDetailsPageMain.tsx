import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  TemplateDetails,
  fetchTemplateById,
  getTemplateDetails,
  getTemplateDetailsError,
  getTemplateDetailsIsLoading,
  templateDetailsActions,
  templateDetailsReducer,
} from '@/entities/template';
import { ReducersList, useDynamicModule, useInitialEffect, useTypedDispatch } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { ITemplateDetailsPageMainProps } from './TemplateDetailsPageMain.interface';
import styles from './TemplateDetailsPageMain.module.scss';

const reducerList: ReducersList = {
  templateDetails: templateDetailsReducer,
};

export const TemplateDetailsPageMain: FC<ITemplateDetailsPageMainProps> = (props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducerList, true);
  const template = useSelector(getTemplateDetails);
  const isLoading = useSelector(getTemplateDetailsIsLoading);
  const error = useSelector(getTemplateDetailsError);

  const dispatch = useTypedDispatch();
  const { id } = useParams<{ id: string }>();

  useInitialEffect(() => {
    if (!id) {
      dispatch(templateDetailsActions.setError('Шаблон не найден'));
      return;
    }

    dispatch(fetchTemplateById({ id }));
  });

  return (
    <div
      {...anotherProps}
      data-testid="templateDetailsPageMain"
      className={classNames(styles.template_details_page_main, {}, [className])}
    >
      <TemplateDetails template={template} isLoading={isLoading} error={error} />
    </div>
  );
};
