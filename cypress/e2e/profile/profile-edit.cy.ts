describe('Профиль пользователя', () => {
  describe('Пользователь заходит в профиль', () => {
    beforeEach(() => {
      cy.login().then((data) => {
        cy.visit(`/profile/${data.id}`);
      });
    });

    it('Отображается страница профиля', () => {
      cy.getByTestId('profilePage').should('exist');

      cy.getByTestId('Аватар').should(
        'have.value',
        'https://cdn1.tenchat.ru/static/vbc-gostinder/user-picture/cdc8face-2608-4f07-90c3-68776d03c246.jpeg',
      );

      cy.getByTestId('Никнейм').should('have.value', 'Adminbee');
      cy.getByTestId('Имя').should('have.value', 'Дмитрий');
      cy.getByTestId('Фамилия').should('have.value', 'Бажаев');
      cy.getByTestId('Возраст').should('have.value', '22');
      cy.getByTestId('Валюта').should('have.value', 'RUB');
      cy.getByTestId('Страна').should('have.value', 'Украина');
      cy.getByTestId('Город').should('have.value', 'Нижний Новгород');

      cy.updateProfile();

      cy.getByTestId('Имя').should('have.value', 'Тестовое имя');
      cy.getByTestId('Фамилия').should('have.value', 'Тестовая фамилия');

      cy.resetProfile();
    });
  });
});
