# Особенности:

- Специально не использованы библиотеки предоставляющие:
  (UI (Headless UI, React aria), Обсерверы, Работу с URL, FP, Итераторы, Работу с хранилищами LS, SS, IDB,
  Работу с промисами, Утилиты, Валидацию, Работу с формами, Работу с потоками ивентов(RxJS),
  Парсерные генераторы, Часть правил ESLint (wheatley-code/eslint-plugin)).
  Все реализовано самостоятельно с целью прокачать навыки.
  Использован только самый минимум

# Технологии:

- Webpack конфигурация
- Архитектура FSD
- Анимации используя framer motion
- i18n
- Babel
- Eslint
- Prettier
- Stylelint
- Jest
- React testing library
- Юнит, интеграционные, скриншотные тесты
- Storybook
- Loki, Скриншотные тесты
- CI pipeline (Github actions)
- pre commit хуки
- Axios
- React
- Redux, RTK
- React window
- Json server

# Реализации:

- Свои компоненты
- Свои хелперы, утилиты
- Кастомные хуки
- Универсальный класс для работы с хранилищем типа ключ:значение
- Патерны
- Observer для реакции на события из любой точки приложения минуя Redux
- Реализация "монад" (SyncPromise)
- Реализация популярных функций из FP
- Своя реализация асинхронных потоков для ивентов (функция on())(aka RxJS)
- Итераторы, генераторы
- Своя реализация валидации
- Оптимизация асинхронные подгрузки компонентов и редьюсеров
- Бесконечная лента шаблонов
- Скрипт для удобного просмотра результатов скрин теста
- Написан свой ESLint плагин
- Написан свой Babel плагин

- [] Реализация парсера формул на основе парсерных генераторов
- [] Реализация "библиотеки" для работы с url (path)
