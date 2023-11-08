// import { fireEvent, screen } from '@testing-library/react';
// import { TemplatesPageFilters } from './TemplatesPageFilters';
// import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
// import { TemplateSortFields, TemplateSortOrders } from '../../model/types/templatesPage';
// import { TemplateTags, TemplateView } from 'entities/template';
// import { templateTabs } from 'entities/template/model/consts/tags';

// ! FIX TEST

// describe('TemplatesPageFilters', () => {
//   test('In the document', () => {
//     const changeSort = jest.fn();
//     const changeSortOrder = jest.fn();
//     const changeSearch = jest.fn();
//     const changeView = jest.fn();
//     const changeTag = jest.fn();

//     renderComponent(
//       <TemplatesPageFilters
//         sort={TemplateSortFields.TITLE}
//         changeSort={changeSort}
//         sortOrder={TemplateSortOrders.ASC}
//         changeSortOrder={changeSortOrder}
//         search=""
//         changeSearch={changeSearch}
//         view={TemplateView.SQUARES}
//         changeView={changeView}
//         tag={TemplateTags.IT}
//         changeTag={changeTag}
//       />,
//     );

//     expect(screen.getByTestId('templatesPageFilters')).toBeInTheDocument();
//   });

//   test('In the document + change sort', () => {
//     const changeSort = jest.fn();
//     const changeSortOrder = jest.fn();
//     const changeSearch = jest.fn();
//     const changeView = jest.fn();
//     const changeTag = jest.fn();

//     renderComponent(
//       <TemplatesPageFilters
//         sort={TemplateSortFields.TITLE}
//         changeSort={changeSort}
//         sortOrder={TemplateSortOrders.ASC}
//         changeSortOrder={changeSortOrder}
//         search=""
//         changeSearch={changeSearch}
//         view={TemplateView.SQUARES}
//         changeView={changeView}
//         tag={TemplateTags.IT}
//         changeTag={changeTag}
//       />,
//     );

//     const sortInput = screen.getByTestId('sortInput');

//     fireEvent.focus(sortInput);

//     const title = screen.getByText(TemplateSortFields.TITLE);
//     const createdAt = screen.getByText(TemplateSortFields.CREATED_AT);
//     const views = screen.getByText(TemplateSortFields.VIEWS);

//     fireEvent.mouseDown(title);
//     expect(changeSort.mock.calls.length).toBe(1);
//     expect(changeSort.mock.calls[0][0]).toBe(TemplateSortFields.TITLE);

//     fireEvent.mouseDown(createdAt);
//     expect(changeSort.mock.calls.length).toBe(2);
//     expect(changeSort.mock.calls[1][0]).toBe(TemplateSortFields.CREATED_AT);

//     fireEvent.mouseDown(views);
//     expect(changeSort.mock.calls.length).toBe(3);
//     expect(changeSort.mock.calls[2][0]).toBe(TemplateSortFields.VIEWS);

//     expect(sortInput).toBeInTheDocument();
//     expect(screen.getByTestId('templatesPageFilters')).toBeInTheDocument();
//     expect(title).toBeInTheDocument();
//     expect(createdAt).toBeInTheDocument();
//     expect(views).toBeInTheDocument();
//   });

//   test('In the document + change sort order', () => {
//     const changeSort = jest.fn();
//     const changeSortOrder = jest.fn();
//     const changeSearch = jest.fn();
//     const changeView = jest.fn();
//     const changeTag = jest.fn();

//     renderComponent(
//       <TemplatesPageFilters
//         sort={TemplateSortFields.TITLE}
//         changeSort={changeSort}
//         sortOrder={TemplateSortOrders.ASC}
//         changeSortOrder={changeSortOrder}
//         search=""
//         changeSearch={changeSearch}
//         view={TemplateView.SQUARES}
//         changeView={changeView}
//         tag={TemplateTags.IT}
//         changeTag={changeTag}
//       />,
//     );

//     const sortOrderInput = screen.getByTestId('sortOrderInput');

//     fireEvent.focus(sortOrderInput);

//     const asc = screen.getByText(TemplateSortOrders.ASC);
//     const desc = screen.getByText(TemplateSortOrders.DESC);

//     fireEvent.mouseDown(asc);
//     expect(changeSortOrder.mock.calls.length).toBe(1);
//     expect(changeSortOrder.mock.calls[0][0]).toBe(TemplateSortOrders.ASC);

//     fireEvent.mouseDown(desc);
//     expect(changeSortOrder.mock.calls.length).toBe(2);
//     expect(changeSortOrder.mock.calls[1][0]).toBe(TemplateSortOrders.DESC);

//     expect(sortOrderInput).toBeInTheDocument();
//     expect(screen.getByTestId('templatesPageFilters')).toBeInTheDocument();
//     expect(asc).toBeInTheDocument();
//     expect(desc).toBeInTheDocument();
//   });

//   test('In the document + change search', () => {
//     const changeSort = jest.fn();
//     const changeSortOrder = jest.fn();
//     const changeSearch = jest.fn();
//     const changeView = jest.fn();
//     const changeTag = jest.fn();

//     renderComponent(
//       <TemplatesPageFilters
//         sort={TemplateSortFields.TITLE}
//         changeSort={changeSort}
//         sortOrder={TemplateSortOrders.ASC}
//         changeSortOrder={changeSortOrder}
//         search=""
//         changeSearch={changeSearch}
//         view={TemplateView.SQUARES}
//         changeView={changeView}
//         tag={TemplateTags.IT}
//         changeTag={changeTag}
//       />,
//     );

//     const searchInput = screen.getByTestId('searchInput');

//     fireEvent.change(searchInput, { target: { value: 'Table' } });

//     expect(changeSearch.mock.calls.length).toBe(1);
//     expect(changeSearch.mock.calls[0][0]).toBe('Table');

//     expect(searchInput).toBeInTheDocument();
//     expect(screen.getByTestId('templatesPageFilters')).toBeInTheDocument();
//   });

//   test('In the document + change dragable tabs', () => {
//     const changeSort = jest.fn();
//     const changeSortOrder = jest.fn();
//     const changeSearch = jest.fn();
//     const changeView = jest.fn();
//     const changeTag = jest.fn();

//     renderComponent(
//       <TemplatesPageFilters
//         sort={TemplateSortFields.TITLE}
//         changeSort={changeSort}
//         sortOrder={TemplateSortOrders.ASC}
//         changeSortOrder={changeSortOrder}
//         search=""
//         changeSearch={changeSearch}
//         view={TemplateView.SQUARES}
//         changeView={changeView}
//         tag={TemplateTags.IT}
//         changeTag={changeTag}
//       />,
//     );

//     const tabData = templateTabs[1];
//     const tab = screen.getByText(tabData.text);

//     fireEvent.click(tab);

//     expect(changeTag.mock.calls.length).toBe(1);
//     expect(changeTag.mock.calls[0][0]).toBe(tabData.value);

//     templateTabs.forEach(({ text }) => {
//       expect(screen.getByText(text)).toBeInTheDocument();
//     });

//     expect(screen.getByTestId('templatesPageFilters')).toBeInTheDocument();
//     expect(screen.getByTestId('tabs')).toBeInTheDocument();
//     expect(screen.getByTestId('dragLine')).toBeInTheDocument();
//   });
// });
