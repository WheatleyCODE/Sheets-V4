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
  sortItems,
  sortOrderItems,
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

  const sortInput = useValidInput(sort);
  const sortOrderInput = useValidInput(sortOrder);
  const searchInput = useValidInput(search);
  const { t } = useTranslation();

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

  const changeSort = useCallback(
    (sort: TemplateSortFields) => {
      setSort(sort);
      fetchTemplatesOnChange();
    },
    [fetchTemplatesOnChange, setSort],
  );

  const changeSortOrder = useCallback(
    (sortOrder: TemplateSortOrders) => {
      setSortOrder(sortOrder);
      fetchTemplatesOnChange();
    },
    [fetchTemplatesOnChange, setSortOrder],
  );

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
              data-testid="searchInput"
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
              data-testid="sortInput"
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
              data-testid="sortOrderInput"
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
