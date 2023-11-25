describe('Страница шаблонов', () => {
  describe('Пользователь открывает страницу  шаблонов', () => {
    beforeEach(() => {
      cy.login().then(() => {
        cy.visit('/templates');
      });
    });

    it('Отображается страница шаблонов', () => {
      cy.getByTestId('templatesPage').should('exist');
    });

    it('Отображается список шаблонов', () => {
      cy.getByTestId('templateList').should('exist');
    });

    it('Отображается минимум 3 шаблона', () => {
      cy.getByTestId('templateListItem').should('have.length.greaterThan', 3);
    });

    it('Отображается 1 шаблона, на фикстурах', () => {
      cy.intercept('GET', '**/templates?*', { fixture: 'templates.json' });
      cy.getByTestId('templateListItem').should('have.length', 1);
    });
  });
});
