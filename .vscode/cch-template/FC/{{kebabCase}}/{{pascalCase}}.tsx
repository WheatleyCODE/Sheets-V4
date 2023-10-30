import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './{{pascalCase}}.module.scss';

interface I{{pascalCase}}Props extends React.HTMLAttributes<HTMLDivElement> {
}

export const {{pascalCase}}: FC<I{{pascalCase}}Props> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="{{camelCase}}" className={classNames(styles.{{snakeCase}}, {}, [className])}>
      {{pascalCase}} 
    </div>
  );
};
