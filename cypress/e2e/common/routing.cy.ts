describe('Роутинг', () => {
  describe('Пользователь не авторизован', () => {
    it('Переход на главную страницу', () => {
      cy.visit('/');
      cy.getByTestId('landingPage').should('exist');
    });

    it('Переход открывает страницу профиля', () => {
      cy.visit('/profile/1');
      cy.getByTestId('homePage').should('exist');
    });

    it('Переход открывает несуществующий маршрут ', () => {
      cy.visit('/fasfasfasf');
      cy.getByTestId('notFoundPage').should('exist');
    });
  });

  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login();
    });

    it('Переход открывает страницу профиля', () => {
      cy.visit('/profile/1');
      cy.getByTestId('profilePage').should('exist');
    });

    it('Переход открывает страницу со списком шаблонов', () => {
      cy.visit('/templates');
      cy.getByTestId('templatesPage').should('exist');
    });
  });
});
