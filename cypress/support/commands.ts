import { removeComment } from './commands/comment/remove-comment';
import { typeComment } from './commands/comment/type-comment';
import { getByTestId } from './commands/common/getByTestId';
import { login } from './commands/common/login';
import { resetProfile } from './commands/profile/reset-profile';
import { updateProfile } from './commands/profile/update-profile';
import { setRate } from './commands/rating/set-rate';
import { createTemplate } from './commands/template/create-template';
import { removeTemplate } from './commands/template/remove-template';

Cypress.Commands.add('login', login);
Cypress.Commands.add('getByTestId', getByTestId);
Cypress.Commands.add('updateProfile', updateProfile);
Cypress.Commands.add('resetProfile', resetProfile);
Cypress.Commands.add('createTemplate', createTemplate);
Cypress.Commands.add('removeTemplate', removeTemplate);
Cypress.Commands.add('typeComment', typeComment);
Cypress.Commands.add('removeComment', removeComment);
Cypress.Commands.add('setRate', setRate);
