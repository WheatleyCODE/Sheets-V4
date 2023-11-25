export const updateProfile = () => {
  cy.getByTestId('button').contains('Редактировать').click();
  cy.getByTestId('Имя').clear().type('Тестовое имя');
  cy.getByTestId('Фамилия').clear().type('Тестовая фамилия');
  cy.getByTestId('button').contains('Сохранить').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(): Chainable<void>;
    }
  }
}
