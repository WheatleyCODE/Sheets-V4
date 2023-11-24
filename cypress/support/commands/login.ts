import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from '../../../src/shared/consts';
import { KVFactory } from '../../../src/shared/lib/kv-storage';

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

export const login = (email: string = 'ya@mail.ru', password: string = '12345678') => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/login',
    body: {
      email,
      password,
    },
  }).then(({ body }) => {
    ls.set(LS_AUTH_KEY, body);
  });
};
