import { screen } from '@testing-library/react';
import { EditableProfile } from './EditableProfile';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('EditableProfile', () => {
  test('In the document', () => {
    renderComponent(<EditableProfile />);

    expect(screen.getByTestId('editableProfile')).toBeInTheDocument();
  });
});
