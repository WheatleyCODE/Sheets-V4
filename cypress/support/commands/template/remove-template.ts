export const removeTemplate = (templateId: string) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/templates/${templateId}`,
    headers: { Authorization: 'random string' },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      removeTemplate(templateId: string): Chainable<void>;
    }
  }
}
