import { ChangeEvent, FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineFilterList, MdOutlineSearch, MdOutlineSort } from 'react-icons/md';
import { useTemplatesPageSort } from '../../model/selectors/get-templates-page-sort/getTemplatesPageSort';
import { useTemplatesPageSortOrder } from '../../model/selectors/get-templates-page-sort-order/getTemplatesPageSortOrder';
import { useTemplatesPageSearch } from '../../model/selectors/get-templates-page-search/getTemplatesPageSearch';
import { useTemplatesPageTag } from '../../model/selectors/get-templates-page-tag/getTemplatesPageTag';
import { useTemplatesPageView } from '../../model/selectors/get-templates-page-templates-view/getTemplatesPageView';
import { useTemplatesPageActions } from '../../model/slice/templatesPageSlice';
import { useFetchTemplatesPageTemplates } from '../../model/services/fetch-templates-page-templates/fetchTemplatesPageTemplates';
import { TemplatesViewSwitcher } from '@/features/templates-view-switcher';
import { TemplateTags, TemplateView, ITemplateTab, templateTabs } from '@/entities/template';
import { Input, useValidInput } from '@/shared/ui/input';
import { DragLine, DragLineItem } from '@/shared/ui/drag-line';
import { TabItem, Tabs } from '@/shared/ui/tabs';
import { intoIter } from '@/shared/lib/iterators';
import { Title } from '@/shared/ui/title';
import { VStack, Width } from '@/shared/ui/containers';
import { useDebounce } from '@/shared/lib/hooks';
import {
  TemplateSortFields,
  TemplateSortOrders,
  getSortItems,
  getSortOrderItems,
} from '../../model/consts/templatesPage.consts';
import { classNames } from '@/shared/lib/class-names';
import type { ITemplatesPageFiltersProps } from './TemplatesPageFilters.interface';
import styles from './TemplatesPageFilters.module.scss';

export const TemplatesPageFilters: FC<ITemplatesPageFiltersProps> = (props) => {
  const { className, ...anotherProps } = props;
  const sort = useTemplatesPageSort();
  const sortOrder = useTemplatesPageSortOrder();
  const search = useTemplatesPageSearch();
  const view = useTemplatesPageView();
  const tag = useTemplatesPageTag();
  const fetchTemplatesPageTemplates = useFetchTemplatesPageTemplates();
  const { setPage, setView, setSort, setSearch, setSortOrder, setTags } = useTemplatesPageActions();

  const sortInput = useValidInput({ input: { initialValue: sort } });
  const sortOrderInput = useValidInput({ input: { initialValue: sortOrder } });
  const searchInput = useValidInput({ input: { initialValue: search } });
  const { t } = useTranslation('templates');

  const fetchTemplatesOnChange = useCallback(() => {
    setPage(1);
    fetchTemplatesPageTemplates({ isReplace: true });
  }, [fetchTemplatesPageTemplates, setPage]);

  const changeView = useCallback(
    (view: TemplateView) => {
      setView(view);
    },
    [setView],
  );

  // const changeSort = useCallback(
  //   (sort: TemplateSortFields) => {
  //     setSort(sort);
  //     fetchTemplatesOnChange();
  //   },
  //   [fetchTemplatesOnChange, setSort],
  // );

  // const changeSortOrder = useCallback(
  //   (sortOrder: TemplateSortOrders) => {
  //     setSortOrder(sortOrder);
  //     fetchTemplatesOnChange();
  //   },
  //   [fetchTemplatesOnChange, setSortOrder],
  // );

  const changeTag = useCallback(
    (tag: TemplateTags) => {
      setTags(tag);
      fetchTemplatesOnChange();
    },
    [fetchTemplatesOnChange, setTags],
  );

  const changeSearch = useDebounce((search: string) => {
    setSearch(search);
    fetchTemplatesOnChange();
  }, 300);

  useEffect(() => {
    sortInput.data.changeValue(sort);
    sortOrderInput.data.changeValue(sortOrder);
    searchInput.data.changeValue(search);
  }, [sort, sortOrder, search]);

  // const onChangeSort = useCallback(
  //   (sort: TemplateSortFields) => {
  //     sortInput.changeValue(sort);
  //     changeSort(sort);
  //   },
  //   [changeSort, sortInput],
  // );

  // const onChangeSort2 = useCallback(
  //   (item: IInputOptionsMenuItem) => {
  //     sortInput.changeValue(item.text as TemplateSortFields);
  //     changeSort(item.value as TemplateSortFields);
  //   },
  //   [changeSort, sortInput],
  // );

  // const onChangeSortOrder = useCallback(
  //   (sortOrder: TemplateSortOrders) => {
  //     sortOrderInput.changeValue(sortOrder);
  //     changeSortOrder(sortOrder);
  //   },
  //   [changeSortOrder, sortOrderInput],
  // );

  // const onChangeSortOrder2 = useCallback(
  //   (item: IInputOptionsMenuItem) => {
  //     sortOrderInput.changeValue(item.text as TemplateSortOrders);
  //     changeSortOrder(item.value as TemplateSortOrders);
  //   },
  //   [changeSortOrder, sortOrderInput],
  // );

  const onChangeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value;
      searchInput.handlers.onChange(e);
      changeSearch(search);
    },
    [changeSearch, searchInput],
  );

  const tabDragItems = intoIter<ITemplateTab>(templateTabs)
    .map(({ value, text }) => (
      <DragLineItem key={value} itemId={value} width={150}>
        <TabItem<TemplateTags> onSelectItem={changeTag} itemId={value} value={value}>
          <div className={styles.teg_name}>{t(text)}</div>
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
        <Title isStopShow={searchInput.data.isFocus} classNameContainer={styles.title} text={t('Поиск')}>
          <div className={styles.search}>
            <Input
              className={styles.search_input}
              Icon={MdOutlineSearch}
              placeholder={t('Поиск')}
              type="text"
              data-testid="searchInput"
              {...searchInput.data}
              {...searchInput.handlers}
              onChange={onChangeSearch}
              validError={t(searchInput.data.validError || '')}
            />
          </div>
        </Title>

        <Title isStopShow={sortInput.data.isFocus} text={t('Изменить сортировку')}>
          <div className={styles.sort}>
            <Input
              className={styles.sort_input}
              Icon={MdOutlineFilterList}
              placeholder={t('Сортировать по')}
              type="text"
              data-testid="sortInput"
              {...sortInput.data}
              {...sortInput.handlers}
              validError={t(sortInput.data.validError || '')}
            />
          </div>
        </Title>

        <Title isStopShow={sortOrderInput.data.isFocus} text={t('Изменить порядок сортировки')}>
          <div className={styles.sortOrder}>
            <Input
              className={styles.sortOrder_input}
              Icon={MdOutlineSort}
              placeholder={t('Порядок сортировки')}
              type="text"
              data-testid="sortOrderInput"
              {...sortOrderInput.data}
              {...sortOrderInput.handlers}
              validError={t(sortOrderInput.data.validError || '')}
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
