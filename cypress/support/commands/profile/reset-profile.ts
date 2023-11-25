export const resetProfile = (profileId = '1') => {
  cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'random string' },
    body: {
      id: '1',
      userId: '1',
      age: '22',
      city: 'Нижний Новгород',
      country: 'Украина',
      currency: 'RUB',
      firstname: 'Дмитрий',
      lastname: 'Бажаев',
      username: 'Adminbee',
      avatar: 'https://cdn1.tenchat.ru/static/vbc-gostinder/user-picture/cdc8face-2608-4f07-90c3-68776d03c246.jpeg',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      resetProfile(profileId?: string): Chainable<void>;
    }
  }
}
