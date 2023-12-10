import { screen } from '@testing-library/react';
import { SelectItem } from './SelectItem';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';

describe('SelectItem', () => {
  test('In the document', () => {
    renderComponent(<SelectItem item={{ text: 'text', value: 'value' }} changeText={() => {}} />);

    expect(screen.getByTestId('selectItem')).toBeInTheDocument();
  });
});
