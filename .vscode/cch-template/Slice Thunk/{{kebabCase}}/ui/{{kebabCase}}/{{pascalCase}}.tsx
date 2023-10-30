import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { {{camelCase}}Actions, {{camelCase}}Reducer } from '../../model/slice/{{camelCase}}Slice';
import { get{{pascalCase}} } from '../../model/selectors/get-{{kebabCase}}/get{{pascalCase}}';
import { fetch{{pascalCase}} } from '../../model/services/fetch-{{kebabCase}}/fetch{{pascalCase}}';
import { useDynamicModule, useTypedDispatch, ReducersList } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/class-names';
import styles from './{{pascalCase}}.module.scss';

interface I{{pascalCase}}Props extends React.HTMLAttributes<HTMLDivElement> {
}

const reducers: ReducersList = { {{camelCase}}: {{camelCase}}Reducer };

export const {{pascalCase}}: FC<I{{pascalCase}}Props> = (props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers, true);
  const dispatch = useTypedDispatch();
  const {{camelCase}} = useSelector(get{{pascalCase}});
  const { t } = useTranslation();

  const fetchData = useCallback(() => {
    fetch{{pascalCase}}();
  }, [fetch{{pascalCase}}]);

  const setData = useCallback(() => {
    dispatch({{camelCase}}Actions.set{{pascalCase}}({ a: 'ne null' }));
  }, [dispatch]);

  return (
    <div {...anotherProps} data-testid="{{camelCase}}" className={classNames(styles.{{snakeCase}}, {}, [className])}>
      {{pascalCase}} 
      {JSON.stringify({{camelCase}})}
    </div>
  );
};
