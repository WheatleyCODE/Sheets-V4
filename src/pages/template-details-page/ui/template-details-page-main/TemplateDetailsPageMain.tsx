import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import {
  TemplateDetails,
  useTemplateDetails,
  useTemplateDetailsError,
  useTemplateDetailsIsLoading,
  templateDetailsReducer,
  useFetchTemplateById,
  useTemplateDetailsActions,
} from '@/entities/template';
import { ReducersList, useDynamicModule, useInitialEffect } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { ITemplateDetailsPageMainProps } from './TemplateDetailsPageMain.interface';
import styles from './TemplateDetailsPageMain.module.scss';

const reducerList: ReducersList = {
  templateDetails: templateDetailsReducer,
};

export const TemplateDetailsPageMain: FC<ITemplateDetailsPageMainProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducerList, true);

  const template = useTemplateDetails();
  const isLoading = useTemplateDetailsIsLoading();
  const error = useTemplateDetailsError();
  const fetchTemplateById = useFetchTemplateById();
  const { setError } = useTemplateDetailsActions();
  const { id } = useParams<{ id: string }>();

  useInitialEffect(() => {
    if (!id) {
      setError('Шаблон не найден');
      return;
    }

    fetchTemplateById({ id });
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
});
