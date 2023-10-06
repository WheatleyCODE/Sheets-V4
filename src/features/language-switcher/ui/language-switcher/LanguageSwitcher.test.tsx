import { screen } from '@testing-library/react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('LanguageSwitcher', () => {
  test('In the document', () => {
    renderComponent(<LanguageSwitcher />);

    expect(screen.getByTestId('languageSwitcher')).toBeInTheDocument();
    expect(screen.getByText('Язык')).toBeInTheDocument();
  });
});
