import { screen } from '@testing-library/react';
import { Input } from './Input';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';
import { MdHome } from 'react-icons/md';

describe('Input', () => {
  test('In the document', () => {
    renderComponent(
      <Input
        value="input"
        Icon={MdHome}
        type="text"
        isError={false}
        inputRef={{} as any}
        changeIsError={() => {}}
        changeIsFocus={() => {}}
        changeIsMouseDown={() => {}}
        changeIsTouched={() => {}}
        changeValidError={() => {}}
        changeValue={() => {}}
        isMouseDown={false}
        onBlur={() => {}}
        onChange={() => {}}
        onFocus={() => {}}
        onMouseDown={() => {}}
        onMouseUp={() => {}}
        validError={null}
        isFocus={false}
        isTouched={false}
        isReadonly={false}
      />,
    );
    expect(screen.getByTestId('input-icon')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByDisplayValue('input')).toBeInTheDocument();
  });
});
