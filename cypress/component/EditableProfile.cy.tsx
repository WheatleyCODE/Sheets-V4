import { EditableProfile } from '../../src/widgets/editable-profile';
import { TestProvider } from '../../src/shared/lib/tests/render-component/renderComponent';

describe('EditableProfile.cy.tsx', () => {
  it('playground', () => {
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });

    cy.mount(
      <TestProvider>
        <EditableProfile />
      </TestProvider>,
    );
  });
});
