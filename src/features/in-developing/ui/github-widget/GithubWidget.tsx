import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import { FaGithub } from 'react-icons/fa';
import type { IGithubWidgetProps } from './GithubWidget.interface';
import styles from './GithubWidget.module.scss';

export const GithubWidget: FC<IGithubWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="githubWidget" className={classNames(styles.github_widget, {}, [className])}>
      <div className={classNames(styles.square, {}, [styles._v1])}>
        <div className={classNames(styles.git_icon, {}, [])}>
          <FaGithub />
        </div>
      </div>
      <div className={classNames(styles.square, {}, [styles._v2])}></div>
      <div className={classNames(styles.square, {}, [styles._v3])}></div>
    </div>
  );
};
