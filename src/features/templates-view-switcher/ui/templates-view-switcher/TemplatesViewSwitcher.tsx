import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TemplateView } from 'entities/template';
import { MdOutlineViewList, MdOutlineViewModule } from 'react-icons/md';
import { Button, ButtonStyles } from 'shared/ui/button';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplatesViewSwitcher.module.scss';
import { Title } from 'shared/ui/title';

interface ITemplatesViewSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  view: TemplateView;
  changeView: (view: TemplateView) => void;
}

export const TemplatesViewSwitcher: FC<ITemplatesViewSwitcherProps> = (props) => {
  const { className, view, changeView, ...anotherProps } = props;
  const { t } = useTranslation();

  const isSquares = view === TemplateView.SQUARES;

  const setViewSquares = useCallback(() => {
    changeView(TemplateView.SQUARES);
  }, [changeView]);

  const setViewLines = useCallback(() => {
    changeView(TemplateView.LINES);
  }, [changeView]);

  return (
    <div
      {...anotherProps}
      data-testid="templatesViewSwitcher"
      className={classNames(styles.templates_view_switcher, {}, [className])}
    >
      <div>
        <Title text={t('Сменить вид на квадратики')}>
          <Button
            onClick={setViewSquares}
            buttonStyle={ButtonStyles.CLEAR}
            className={classNames(styles.button, { [styles.active]: isSquares })}
            Icon={MdOutlineViewModule}
          />
        </Title>
      </div>

      <div>
        <Title text={t('Сменить вид на линии')}>
          <Button
            onClick={setViewLines}
            buttonStyle={ButtonStyles.CLEAR}
            className={classNames(styles.button, { [styles.active]: !isSquares })}
            Icon={MdOutlineViewList}
          />
        </Title>
      </div>
    </div>
  );
};
