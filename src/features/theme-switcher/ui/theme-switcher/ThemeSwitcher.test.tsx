import { fireEvent, screen } from '@testing-library/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';
import { sleep } from '@/shared/lib/promise';
import { ANIMATION_DURATION_MS } from '@/shared/consts';

describe('ThemeSwitcher', () => {
  test('In the document', () => {
    renderComponent(<ThemeSwitcher />);

    expect(screen.getByTestId('themeSwitcher')).toBeInTheDocument();
    expect(screen.getByText('Тема')).toBeInTheDocument();
  });

  test('In the document + click', async () => {
    renderComponent(<ThemeSwitcher />);

    const button = screen.getByText('Тема');
    fireEvent.click(button);

    await sleep(ANIMATION_DURATION_MS);

    expect(screen.getByText('Сменить тему')).toBeInTheDocument();
    expect(screen.getByText('Настройки')).toBeInTheDocument();
    expect(screen.getByTestId('themeSwitcher')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
