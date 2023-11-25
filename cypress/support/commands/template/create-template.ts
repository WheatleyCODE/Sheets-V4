/* eslint-disable quotes */
import { ITemplate } from '../../../../src/entities/template';

const defaultTemplate = {
  userId: '1',
  title: 'Шаблон Трекер инвестиций',
  subtitle: 'Новый и более удобный',
  image: 'https://www.unisender.com/ru/blog/wp-content/uploads/2022/09/8-2.png',
  views: 2356,
  createdAt: '26.02.2023',
  tags: ['Invest'],
  blocks: [
    {
      id: '5',
      type: 'TEXT',
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
      ],
    },
    {
      id: '8',
      type: 'IMAGE',
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта',
    },
  ],
  sheetsTemplate: {
    row: [],
    col: [],
    cells: [],
  },
} as unknown as ITemplate;

export const createTemplate = (template: ITemplate = defaultTemplate) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/templates',
    headers: { Authorization: 'random string' },
    body: {
      ...template,
    },
  }).then(({ body }) => {
    return body;
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createTemplate(template?: ITemplate): Chainable<ITemplate>;
    }
  }
}
