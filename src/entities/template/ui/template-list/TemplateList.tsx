import { FC } from 'react';
import { ITemplate, TemplateView } from '../../model/types/template';
import { intoIter } from 'shared/lib/iterators';
import { TemplateListItem } from '../template-list-item/TemplateListItem';
import { Skeleton } from 'shared/ui/skeleton';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateList.module.scss';
interface ITemplateListProps extends React.HTMLAttributes<HTMLDivElement> {
  templates: ITemplate[];
  isLoading?: boolean;
  error?: string | null;
  view?: TemplateView;
  isOpenInNewWindow?: boolean;
}

export const TemplateList: FC<ITemplateListProps> = (props) => {
  const {
    className,
    isOpenInNewWindow = false,
    view = TemplateView.SQUARES,
    isLoading,
    templates,
    ...anotherProps
  } = props;

  const skeletons = intoIter(Array(9).fill(0))
    .enumerate()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([_, i]) => (
      <Skeleton key={i} className={classNames(styles.skeleton, {}, [styles[view]])}>
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

  const renderTemplate = (template: ITemplate) => (
    <TemplateListItem
      isOpenInNewWindow={isOpenInNewWindow}
      className={styles.card}
      key={template.id}
      view={view}
      template={template}
    />
  );
  const itemsArr = intoIter<ITemplate>(templates).map(renderTemplate).toArray();

  const isSquares = view === TemplateView.SQUARES;
  const skeletonsArr = isSquares ? skeletons.toArray() : skeletons.take(4).toArray();

  return (
    <div
      {...anotherProps}
      data-testid="templateList"
      className={classNames(styles.template_list, {}, [className, styles[view]])}
    >
      <div className={styles.width}>
        {itemsArr}
        {isLoading && skeletonsArr}
      </div>
    </div>
  );
};
