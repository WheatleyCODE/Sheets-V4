import { CSSProperties, FC, useCallback } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListOnItemsRenderedProps } from 'react-window';
import { ITemplate, TemplateView } from '../../model/types/template';
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
  onScrollEnd?: () => void;
}

const LIST_ITEM_MARGINS = 20;
const LIST_ITEM_SQUARES_HEIGHT = 315;
const LIST_ITEM_SQUARES_WIDTH = 380;
const LIST_ITEM_LINES_HEIGHT = 400;

// ! FIX
export const TemplateList: FC<ITemplateListProps> = (props) => {
  const {
    className,
    isOpenInNewWindow = false,
    view = TemplateView.SQUARES,
    isLoading,
    onScrollEnd,
    templates,
    ...anotherProps
  } = props;

  const isSquares = view === TemplateView.SQUARES;
  // ! FIX NUMBERS
  const skeletonsLength = isSquares ? 12 : 4;

  const getScroll =
    (rows: number) =>
    ({ visibleStopIndex }: ListOnItemsRenderedProps) => {
      if (isLoading) return;

      if (visibleStopIndex === rows - 1) onScrollEnd?.();
    };

  const renderRow = useCallback(
    (style: CSSProperties, index: number, lineCount: number) => {
      if (view === TemplateView.LINES) {
        if (!templates[index]) {
          return (
            <Skeleton style={style} key={index} className={classNames(styles.skeleton, {}, [styles[view]])}>
              <Skeleton className={styles.skeleton_image} />
              <Skeleton className={styles.skeleton_info} />
              <Skeleton className={styles.skeleton_title} />
              <Skeleton className={styles.skeleton_subtitle} />
              <Skeleton className={styles.skeleton_buttons}>
                <Skeleton className={styles.skeleton_button} />
                <Skeleton className={styles.skeleton_button} />
              </Skeleton>
            </Skeleton>
          );
        }
        return (
          <TemplateListItem
            style={style}
            isOpenInNewWindow={isOpenInNewWindow}
            className={styles.card}
            key={templates[index].id}
            view={view}
            template={templates[index]}
          />
        );
      }

      const arr = new Array(lineCount).fill('');

      return (
        <div style={style} className={styles.square_row}>
          {arr.map((_, i) => {
            if (!templates[index + i] && isLoading) {
              return (
                <Skeleton key={index} className={classNames(styles.skeleton, {}, [styles[view]])}>
                  <Skeleton className={styles.skeleton_image} />
                  <Skeleton className={styles.skeleton_info} />
                  <Skeleton className={styles.skeleton_title} />
                  <Skeleton className={styles.skeleton_subtitle} />
                  <Skeleton className={styles.skeleton_buttons}>
                    <Skeleton className={styles.skeleton_button} />
                    <Skeleton className={styles.skeleton_button} />
                  </Skeleton>
                </Skeleton>
              );
            }

            if (!templates[index + i] && !isLoading) return null;

            return (
              <TemplateListItem
                isOpenInNewWindow={isOpenInNewWindow}
                className={styles.card}
                key={templates[index + i].id}
                view={view}
                template={templates[index + i]}
              />
            );
          })}
        </div>
      );
    },
    [isLoading, isOpenInNewWindow, templates, view],
  );

  const getSquaresLineCount = (width: number) => {
    return Math.floor(width / (view === TemplateView.SQUARES ? LIST_ITEM_SQUARES_WIDTH : width));
  };

  const getSquaresRowCount = (rows: number, lineCount: number) => {
    return Math.ceil(rows / lineCount);
  };

  return (
    <div
      {...anotherProps}
      data-testid="templateList"
      className={classNames(styles.template_list, {}, [className, styles[view]])}
    >
      <div className={styles.width}>
        {/* ! FIX NUMBERS */}
        <AutoSizer style={{ width: 'calc(100vw - 40px)', height: 'calc(100vh - 210px)', marginTop: 10 }}>
          {({ height, width }) => {
            const lineCount = getSquaresLineCount(width);

            const rowCount = getSquaresRowCount(
              isLoading ? templates.length + skeletonsLength : templates.length,
              lineCount,
            );

            return (
              <FixedSizeList
                onItemsRendered={getScroll(rowCount)}
                height={height}
                itemCount={rowCount}
                itemSize={
                  view === TemplateView.SQUARES
                    ? LIST_ITEM_SQUARES_HEIGHT + LIST_ITEM_MARGINS
                    : LIST_ITEM_LINES_HEIGHT + LIST_ITEM_MARGINS
                }
                width={width}
              >
                {({ index, style }) => {
                  return renderRow(style, index, lineCount);
                }}
              </FixedSizeList>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};
