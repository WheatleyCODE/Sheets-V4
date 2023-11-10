import { screen } from '@testing-library/react';
import { Star } from './Star';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';
import { MdOutlineStarHalf } from 'react-icons/md';

describe('Star', () => {
  test('In the document', () => {
    renderComponent(
      <Star
        count={5}
        StarIcon={MdOutlineStarHalf}
        getChangeCurrent={() => () => {}}
        selectStar={() => {}}
        isSelect={false}
      />,
    );

    expect(screen.getByTestId('star')).toBeInTheDocument();
  });
});
