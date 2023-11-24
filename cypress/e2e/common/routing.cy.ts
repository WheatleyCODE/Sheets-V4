import { selectByTestId } from '../../helpers/selectByTestId';

describe('Роутинг', () => {
  describe('Пользователь не авторизован', () => {
    it('Переход на главную страницу', () => {
      cy.visit('/');
      cy.get(selectByTestId('landingPage')).should('exist');
    });

    it('Переход открывает страницу профиля', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('homePage')).should('exist');
    });

    it('Переход открывает несуществующий маршрут ', () => {
      cy.visit('/fasfasfasf');
      cy.get(selectByTestId('notFoundPage')).should('exist');
    });
  });

  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login();
    });

    it('Переход открывает страницу профиля', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('profilePage')).should('exist');
    });

    it('Переход открывает страницу со списком шаблонов', () => {
      cy.visit('/templates');
      cy.get(selectByTestId('templatesPage')).should('exist');
    });
  });
});
