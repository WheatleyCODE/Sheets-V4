export const typeComment = (text: string) => {
  cy.getByTestId('commentInput').type(text);
  cy.getByTestId('button').contains('Отправить').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      typeComment(text: string): Chainable<void>;
    }
  }
}
