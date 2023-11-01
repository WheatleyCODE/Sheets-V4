import { fireEvent, screen } from '@testing-library/react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { sleep } from 'shared/lib/promises';
import { ANIMATION_DURATION_MS } from 'shared/consts';

describe('LanguageSwitcher', () => {
  test('In the document', () => {
    renderComponent(<LanguageSwitcher />);

    expect(screen.getByTestId('languageSwitcher')).toBeInTheDocument();
    expect(screen.getByText('Язык')).toBeInTheDocument();
  });

  test('In the document + click', async () => {
    renderComponent(<LanguageSwitcher />);

    const button = screen.getByText('Язык');
    fireEvent.click(button);

    await sleep(ANIMATION_DURATION_MS);

    expect(screen.getByText('Сменить язык')).toBeInTheDocument();
    expect(screen.getByText('Настройки')).toBeInTheDocument();
    expect(screen.getByTestId('languageSwitcher')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
