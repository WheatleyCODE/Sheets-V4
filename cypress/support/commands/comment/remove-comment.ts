// ! FIX разделить команды на тайпинг, запросы и другое
// ! Вроде бы не нужен? removeComment

export const removeComment = (commentId: string) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/comments/${commentId}`,
    headers: { Authorization: 'random string' },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      removeComment(commentId: string): Chainable<void>;
    }
  }
}
