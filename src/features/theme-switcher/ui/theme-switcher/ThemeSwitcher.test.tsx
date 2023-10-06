import { screen } from '@testing-library/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('ThemeSwitcher', () => {
  test('In the document', () => {
    renderComponent(<ThemeSwitcher />);

    expect(screen.getByTestId('themeSwitcher')).toBeInTheDocument();
    expect(screen.getByText('Тема')).toBeInTheDocument();
  });
});
