import { screen } from '@testing-library/react';
import { Image } from './Image';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('Image', () => {
  const imgSrc =
    'https://avatars.mds.yandex.net/i?id=ff63d9036709e4bb15cab817afddf0fddaca9978-10639375-images-thumbs&n=13';
  test('In the document', () => {
    renderComponent(<Image />);

    expect(screen.getByTestId('imageLoad')).toBeInTheDocument();
  });

  test('In the document image', () => {
    renderComponent(<Image src={imgSrc} />);

    expect(screen.getByTestId('imageLoad')).toBeInTheDocument();
  });
});
