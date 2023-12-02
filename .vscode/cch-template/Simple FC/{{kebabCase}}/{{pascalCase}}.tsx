import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { I{{pascalCase}}Props } from './{{pascalCase}}.interface';
import styles from './{{pascalCase}}.module.scss';

export const {{pascalCase}}: FC<I{{pascalCase}}Props> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="{{camelCase}}" className={classNames(styles.{{snakeCase}}, {}, [className])}>
      {{pascalCase}} 
    </div>
  );
};
