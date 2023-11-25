let currentTestTemplateId = '';

describe('Страница шаблона', () => {
  describe('Пользователь открывает страницу шаблона 1', () => {
    beforeEach(() => {
      cy.login().then(() => {
        cy.createTemplate().then((template) => {
          currentTestTemplateId = template.id;
          cy.visit(`/template/${currentTestTemplateId}`);
        });
      });
    });

    afterEach(() => {
      cy.removeTemplate(currentTestTemplateId);
      cy.visit('/templates');
    });

    // it('Отображается страница шаблона', () => {
    //   cy.getByTestId('templateDetailsPage').should('exist');
    // });

    // it('Отображается список рекомендаций', () => {
    //   cy.getByTestId('templateRecommends').should('exist');
    //   cy.getByTestId('templateList').should('exist');
    // });

    // it('Отображается список комментариев', () => {
    //   cy.getByTestId('commentList').should('exist');
    //   cy.getByTestId('commentList').scrollIntoView();
    // });

    // it('Пользователь оставляет комментарий', () => {
    //   cy.typeComment('Тестовый комментарий');
    //   cy.getByTestId('commentListItem').should('have.length', 1);
    // });

    // it('Отображается оценка статьи', () => {
    //   cy.getByTestId('templateRating').should('exist');
    //   cy.getByTestId('rating').should('exist');
    // });

    it('Пользователь оставляет оценку', () => {
      cy.intercept('GET', '**/templates/*', { fixture: 'template-details.json' });
      cy.getByTestId('templateRating').scrollIntoView();
      cy.setRate(5, 'Тестовый feedback');
      cy.get('[data-testrate="10"]').should('exist');
    });
  });
});
