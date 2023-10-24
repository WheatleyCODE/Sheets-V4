import { ChangeEvent, FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsSortDown, BsSortUp } from 'react-icons/bs';
import {
  MdOutlineCalendarMonth,
  MdOutlineFilterList,
  MdOutlineRemoveRedEye,
  MdOutlineSearch,
  MdOutlineSort,
  MdOutlineTitle,
} from 'react-icons/md';
import { TemplatesViewSwitcher } from 'features/templates-view-switcher';
import { TemplateTags, TemplateView } from 'entities/template';
import { ITemplateTab, templateTabs } from 'entities/template/model/consts/tags';
import { Input, useValidInput } from 'shared/ui/input';
import { TemplateSortOrders, TemplateSortFields } from '../../model/types/templatesPage';
import { IInputOptionsMenuItem } from 'shared/ui/input';
import { DragLine, DragLineItem } from 'shared/ui/drag-line';
import { TabItem, Tabs } from 'shared/ui/tabs';
import { intoIter } from 'shared/lib/iterators';
import { Title } from 'shared/ui/title';
import { VStack, Width } from 'shared/ui/containers';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplatesPageFilters.module.scss';

interface ITemplatesPageFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  sort: TemplateSortFields;
  changeSort: (sort: TemplateSortFields) => void;
  sortOrder: TemplateSortOrders;
  changeSortOrder: (sortOrder: TemplateSortOrders) => void;
  search: string;
  changeSearch: (search: string) => void;
  view: TemplateView;
  changeView: (view: TemplateView) => void;
  tag: TemplateTags | string;
  changeTag: (tag: TemplateTags) => void;
}

const sortOrderItems: IInputOptionsMenuItem[] = [
  { text: TemplateSortOrders.ASC, Icon: BsSortUp },
  { text: TemplateSortOrders.DESC, Icon: BsSortDown },
];

const sortItems: IInputOptionsMenuItem[] = [
  { text: TemplateSortFields.TITLE, Icon: MdOutlineTitle },
  { text: TemplateSortFields.VIEWS, Icon: MdOutlineRemoveRedEye },
  { text: TemplateSortFields.CREATED_AT, Icon: MdOutlineCalendarMonth },
];

export const TemplatesPageFilters: FC<ITemplatesPageFiltersProps> = (props) => {
  const {
    className,
    sort,
    sortOrder,
    view,
    search,
    tag,
    changeView,
    changeSearch,
    changeSort,
    changeSortOrder,
    changeTag,
    ...anotherProps
  } = props;
  const sortInput = useValidInput(sort);
  const sortOrderInput = useValidInput(sortOrder);
  const searchInput = useValidInput(search);
  const { t } = useTranslation();

  useEffect(() => {
    sortInput.changeValue(sort);
    sortOrderInput.changeValue(sortOrder);
    searchInput.changeValue(search);
  }, [sort, sortOrder, search]);

  const onChangeSort = useCallback(
    (sort: TemplateSortFields) => {
      sortInput.changeValue(sort);
      changeSort(sort);
    },
    [changeSort, sortInput],
  );

  const onChangeSortOrder = useCallback(
    (sortOrder: TemplateSortOrders) => {
      sortOrderInput.changeValue(sortOrder);
      changeSortOrder(sortOrder);
    },
    [changeSortOrder, sortOrderInput],
  );

  const onChangeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value;
      searchInput.onChange(e);
      changeSearch(search);
    },
    [changeSearch, searchInput],
  );

  const tabDragItems = intoIter<ITemplateTab>(templateTabs)
    .map(({ value, text }) => (
      <DragLineItem key={value} itemId={value} width={150}>
        <TabItem<TemplateTags> onSelectItem={changeTag} itemId={value} value={value}>
          <div className={styles.teg_name}>{text}</div>
        </TabItem>
      </DragLineItem>
    ))
    .toArray();

  return (
    <VStack
      {...anotherProps}
      data-testid="templatesPageFilters"
      className={classNames(styles.templates_page_filters, {}, [className])}
    >
      <Width className={styles.width}>
        <Title isStopShow={searchInput.isActive} classNameContainer={styles.title} text={t('Поиск')}>
          <div className={styles.search}>
            <Input
              className={styles.search_input}
              Icon={MdOutlineSearch}
              value={searchInput.value}
              placeholder={t('Поиск')}
              type="text"
              onChange={onChangeSearch}
              onBlur={searchInput.onBlur}
              onFocus={searchInput.onFocus}
              isError={searchInput.isError}
              validError={t(searchInput.validError || '')}
              isActive={searchInput.isActive}
            />
          </div>
        </Title>

        <Title isStopShow={sortInput.isFocus} text={t('Изменить сортировку')}>
          <div className={styles.sort}>
            <Input
              className={styles.sort_input}
              Icon={MdOutlineFilterList}
              value={sortInput.value}
              placeholder={t('Сортировать по')}
              type="text"
              onChange={sortInput.onChange}
              onBlur={sortInput.onBlur}
              onFocus={sortInput.onFocus}
              isError={sortInput.isError}
              validError={t(sortInput.validError || '')}
              isActive={sortInput.isActive}
              isFocus={sortInput.isFocus}
              options={{
                changeValue: onChangeSort,
                items: sortItems,
                isForbidInput: true,
              }}
            />
          </div>
        </Title>

        <Title isStopShow={sortOrderInput.isFocus} text={t('Изменить порядок сортировки')}>
          <div className={styles.sortOrder}>
            <Input
              className={styles.sortOrder_input}
              Icon={MdOutlineSort}
              value={sortOrderInput.value}
              placeholder={t('Порядок сортировки')}
              type="text"
              onChange={sortOrderInput.onChange}
              onBlur={sortOrderInput.onBlur}
              onFocus={sortOrderInput.onFocus}
              isError={sortOrderInput.isError}
              validError={t(sortOrderInput.validError || '')}
              isActive={sortOrderInput.isActive}
              isFocus={sortOrderInput.isFocus}
              options={{
                changeValue: onChangeSortOrder,
                items: sortOrderItems,
                isForbidInput: true,
              }}
            />
          </div>
        </Title>

        <TemplatesViewSwitcher changeView={changeView} view={view} />
      </Width>

      <Width className={styles.width}>
        <Tabs initValue={tag}>
          <DragLine className={styles.drag_line}>{tabDragItems}</DragLine>
        </Tabs>
      </Width>
    </VStack>
  );
};
