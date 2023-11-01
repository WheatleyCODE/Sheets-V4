import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TemplateView } from 'entities/template';
import { MdOutlineViewList, MdOutlineViewModule } from 'react-icons/md';
import { Button, ButtonStyles } from 'shared/ui/button';
import { Title } from 'shared/ui/title';
import { HStack } from 'shared/ui/containers';
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
    <HStack
      justify="end"
      {...anotherProps}
      data-testid="templatesViewSwitcher"
      className={classNames(styles.templates_view_switcher, {}, [className])}
    >
      <HStack justify="start">
        <Title text={t('Сменить вид на квадратики')}>
          <Button
            data-testid="buttonSquares"
            onClick={setViewSquares}
            buttonStyle={ButtonStyles.CLEAR}
            className={classNames(styles.button, { [styles.active]: isSquares })}
            Icon={MdOutlineViewModule}
          />
        </Title>
      </HStack>

      <HStack justify="start">
        <Title text={t('Сменить вид на линии')}>
          <Button
            data-testid="buttonLines"
            onClick={setViewLines}
            buttonStyle={ButtonStyles.CLEAR}
            className={classNames(styles.button, { [styles.active]: !isSquares })}
            Icon={MdOutlineViewList}
          />
        </Title>
      </HStack>
    </HStack>
  );
};
