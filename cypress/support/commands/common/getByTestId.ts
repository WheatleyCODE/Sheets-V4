import { selectByTestId } from '../../../helpers/selectByTestId';

export const getByTestId = (testId: string) => {
  return cy.get(selectByTestId(testId)) as ReturnType<typeof cy.get>;
};

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): ReturnType<typeof cy.get>;
    }
  }
}
