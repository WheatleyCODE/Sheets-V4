import { fireEvent, screen } from '@testing-library/react';
import { Button } from './Button';
import { ButtonColor, ButtonSize, ButtonStyles } from './Button.consts';
import { MdHome } from 'react-icons/md';
import { renderComponent } from '@/shared/lib/tests';

describe('Button', () => {
  test('In the document', () => {
    renderComponent(<Button text="Кнопка" />);
    expect(screen.getByText('Кнопка')).toBeInTheDocument();
  });

  test('In the document + classes', () => {
    renderComponent(
      <Button
        buttonStyle={ButtonStyles.CLEAR}
        buttonColor={ButtonColor.PRIMARY}
        buttonSize={ButtonSize.BIG}
        disable
        text="Кнопка"
      />,
    );
    const button = screen.getByText('Кнопка');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('clear');
    expect(button).toHaveClass('primary');
    expect(button).toHaveClass('big');
    expect(button).toHaveClass('disable');
  });

  test('In the document + icon', () => {
    renderComponent(<Button Icon={MdHome} text="Кнопка" />);

    expect(screen.getByText('Кнопка')).toBeInTheDocument();
    expect(screen.getByTestId('button-icon')).toBeInTheDocument();
  });

  test('Click button', () => {
    const callback = jest.fn();
    renderComponent(<Button Icon={MdHome} text="Кнопка" onClick={callback} />);

    const button = screen.getByText('Кнопка');

    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('button-icon')).toBeInTheDocument();
    fireEvent(button, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(callback.mock.calls).toHaveLength(1);
  });
});
