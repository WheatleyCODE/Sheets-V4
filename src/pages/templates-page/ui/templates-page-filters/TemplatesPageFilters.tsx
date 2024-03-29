import { ChangeEvent, FC, useCallback } from 'react';
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
import { Select, useSelect } from '@/shared/ui/select';
import { TabItem, Tabs } from '@/shared/ui/tabs';
import { intoIter } from '@/shared/lib/iterators';
import { Title } from '@/shared/ui/title';
import { VStack, Width } from '@/shared/ui/containers';
import { useDebounce } from '@/shared/lib/hooks';
import { getSortItems, getSortOrderItems } from '../../model/consts/templatesPage.consts';
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

  const searchInput = useValidInput({ initValue: search });
  const { t } = useTranslation('templates');

  const selectSort = useSelect({
    useControllableMenu: {
      items: getSortItems(t),
      onSelectItem: (item) => {
        setSort(item.value as any);
        fetchTemplatesOnChange();
      },
    },
    useValidInput: { initValue: getSortItems(t).find((item) => item.value === sort)?.text },
  });

  const selectSortOrder = useSelect({
    useControllableMenu: {
      items: getSortOrderItems(t),
      onSelectItem: (item) => {
        setSortOrder(item.value as any);
        fetchTemplatesOnChange();
      },
    },
    useValidInput: { initValue: getSortOrderItems(t).find((item) => item.value === sortOrder)?.text },
  });

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

  const onChangeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value;
      searchInput.eventHandlers.onChange(e);
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
              {...searchInput.dataChangers}
              {...searchInput.eventHandlers}
              inputRef={searchInput.ref}
              onChange={onChangeSearch}
              validError={t(searchInput.data.validError || '')}
            />
          </div>
        </Title>

        <Title isStopShow={selectSort.select.data.isShow} text={t('Изменить сортировку')}>
          <div className={styles.sort}>
            <Select
              Icon={MdOutlineFilterList}
              className={styles.sort_input}
              type="text"
              isWritable={false}
              data-testid="sortInput"
              placeholder={t('Сортировать по')}
              {...selectSort}
              selectRef={selectSort.select.ref}
            />
          </div>
        </Title>

        <Title isStopShow={selectSortOrder.select.data.isShow} text={t('Изменить порядок сортировки')}>
          <div className={styles.sortOrder}>
            <Select
              Icon={MdOutlineSort}
              className={styles.sortOrder_input}
              type="text"
              isWritable={false}
              data-testid="sortOrderInput"
              placeholder={t('Порядок сортировки')}
              {...selectSortOrder}
              selectRef={selectSortOrder.select.ref}
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
