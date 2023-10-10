import { FC, memo } from 'react';
import { ITemplate, TemplateList } from 'entities/template';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplatesPage.module.scss';

interface ITemplatesPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const TemplatesPage: FC<ITemplatesPageProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation('templates');

  return (
    <div
      {...anotherProps}
      data-testid="templatesPage"
      className={classNames(styles.templates_page, {}, [className, 'page'])}
    >
      <TemplateList
        templates={
          [
            {
              id: '1',
              title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, expedita.',
              subtitle: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis enim excepturi odit dignissimos eum, pariatur vitae expedita molestias! Sunt quasi placeat officia ab eaque pariatur provident rerum ipsum doloribus officiis!
      Quasi repellendus facere architecto culpa! Voluptatem esse fugit iusto minima ex quae quod dicta, animi repudiandae omnis, unde, vel error! Esse officia voluptates rerum nesciunt quas sit minus dolore? Explicabo.
      Quae dignissimos excepturi vero minus a delectus dolore libero molestias ex culpa, itaque sapiente eligendi eius, accusamus voluptas accusantium doloribus provident sint labore dolor harum? Exercitationem, voluptas? Ex, officia numquam?`,
              image: 'https://www.unisender.com/ru/blog/wp-content/uploads/2022/09/8-2.png',
              views: 2356,
              createdAt: '26.02.2023',
              tags: ['Invest', 'IT', 'Ecomomics'],
              blocks: [
                {
                  id: '1',
                  type: 'TEXT',
                  title: 'Заголовок этого блока',
                  paragraphs: [
                    'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                    'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                    'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
                  ],
                },
                {
                  id: '4',
                  type: 'CODE',
                  code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
                },
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
                  id: '2',
                  type: 'IMAGE',
                  src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
                  title: 'Рисунок 1 - скриншот сайта',
                },
                {
                  id: '3',
                  type: 'CODE',
                  code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
                },
                {
                  id: '7',
                  type: 'TEXT',
                  title: 'Заголовок этого блока',
                  paragraphs: [
                    'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                    'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
                  ],
                },
                {
                  id: '8',
                  type: 'IMAGE',
                  src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
                  title: 'Рисунок 1 - скриншот сайта',
                },
                {
                  id: '9',
                  type: 'TEXT',
                  title: 'Заголовок этого блока',
                  paragraphs: [
                    'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                  ],
                },
              ],
            },
          ] as ITemplate[]
        }
      />
    </div>
  );
});

export default TemplatesPage;
