import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ITemplate, TemplateView } from '../../model/types/template';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateList.module.scss';
import { intoIter } from 'shared/lib/iterators';
import { TemplateListItem } from '../template-list-item/TemplateListItem';
import { Skeleton } from 'shared/ui/skeleton';

interface ITemplateListProps extends React.HTMLAttributes<HTMLDivElement> {
  templates: ITemplate[];
  isLoading?: boolean;
  error?: string | null;
  view?: TemplateView;
}

export const TemplateList: FC<ITemplateListProps> = (props) => {
  const { className, view = TemplateView.SQUARES, isLoading, templates, ...anotherProps } = props;
  const { t } = useTranslation();

  const aaaa = new Array(15).fill(0).map((_, i) => ({ ...templates[0], id: String(i) }));

  const skeletons = intoIter(Array(15).fill(0)).map(() => (
    <Skeleton className={classNames(styles.skeleton, {}, [styles[view]])}>
      <Skeleton className={styles.skeleton_image} />
      <Skeleton className={styles.skeleton_info} />
      <Skeleton className={styles.skeleton_title} />
      <Skeleton className={styles.skeleton_subtitle} />
      <Skeleton className={styles.skeleton_buttons}>
        <Skeleton className={styles.skeleton_button} />
        <Skeleton className={styles.skeleton_button} />
      </Skeleton>
    </Skeleton>
  ));

  if (isLoading) {
    const isSquares = view === TemplateView.SQUARES;
    const skeletonsArr = isSquares ? skeletons.toArray() : skeletons.take(4).toArray();

    return (
      <div
        {...anotherProps}
        data-testid="templateList"
        className={classNames(styles.template_list, {}, [className, styles[view]])}
      >
        <div className={styles.width}>{skeletonsArr}</div>
      </div>
    );
  }

  const renderTemplate = (template: ITemplate) => (
    <TemplateListItem className={styles.card} key={template.id} view={view} template={template} />
  );
  const itemsArr = intoIter<ITemplate>(aaaa).map(renderTemplate).toArray();

  return (
    <div
      {...anotherProps}
      data-testid="templateList"
      className={classNames(styles.template_list, {}, [className, styles[view]])}
    >
      <div className={styles.width}>{itemsArr}</div>
    </div>
  );
};
