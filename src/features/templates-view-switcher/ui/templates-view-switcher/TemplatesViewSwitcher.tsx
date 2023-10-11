import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TemplateView } from 'entities/template';
import { MdOutlineViewList, MdOutlineViewModule } from 'react-icons/md';
import { Button, ButtonStyles } from 'shared/ui/button';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplatesViewSwitcher.module.scss';

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
        <Button
          onClick={setViewSquares}
          buttonStyle={ButtonStyles.CLEAR}
          className={classNames(styles.button, { [styles.active]: isSquares })}
          Icon={MdOutlineViewModule}
        />
      </div>

      <div>
        <Button
          onClick={setViewLines}
          buttonStyle={ButtonStyles.CLEAR}
          className={classNames(styles.button, { [styles.active]: !isSquares })}
          Icon={MdOutlineViewList}
        />
      </div>
    </div>
  );
};
