import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ITemplate } from '../../model/types/template';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateDetails.module.scss';
import { Loader } from 'shared/ui/loader';
import { Text, TextStyle } from 'shared/ui/text';
import { Skeleton } from 'shared/ui/skeleton';

interface ITemplateDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  template: ITemplate;
  isLoading: boolean;
  error: string | null;
}

export const TemplateDetails: FC<ITemplateDetailsProps> = (props) => {
  const { className, template, isLoading, error, ...anotherProps } = props;
  const { t } = useTranslation('templateDetails');

  if ([1]) {
    return (
      <div
        {...anotherProps}
        data-testid="templateDetails"
        className={classNames(styles.template_details, {}, [className])}
      >
        <Skeleton width="200px" height="200px" borderRadius="50%" />

        <Skeleton className={styles.title_skeleton} width="100%" height="40px" borderRadius="5px" />
        <Skeleton className={styles.text_skeleton} width="100%" height="40px" borderRadius="5px" />
        <Skeleton className={styles.block_skeleton} width="100%" height="200px" borderRadius="5px" />
        <Skeleton className={styles.block_skeleton} width="100%" height="200px" borderRadius="5px" />
        <Skeleton className={styles.block_skeleton} width="100%" height="200px" borderRadius="5px" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        {...anotherProps}
        data-testid="templateDetails"
        className={classNames(styles.template_details, {}, [className, styles.error])}
      >
        <Text textStyle={TextStyle.ERROR} title={t(error)} />
      </div>
    );
  }

  return (
    <div
      {...anotherProps}
      data-testid="templateDetails"
      className={classNames(styles.template_details, {}, [className])}
    >
      {JSON.stringify(template, null, 4)}
    </div>
  );
};
