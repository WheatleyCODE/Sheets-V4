import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IGithubWidgetProps } from './GithubWidget.interface';
import styles from './GithubWidget.module.scss';

export const GithubWidget: FC<IGithubWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="githubWidget" className={classNames(styles.github_widget, {}, [className])}>
      GithubWidget 
    </div>
  );
};
