export const setRate = (starCount: number, feedback: string) => {
  cy.getByTestId(`star.${starCount}`).click();
  cy.getByTestId('rating.feedback').type(feedback);
  cy.getByTestId('confirm.accept').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      setRate(starCount: number, feedback: string): Chainable<void>;
    }
  }
}
