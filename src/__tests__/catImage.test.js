import { render } from '@testing-library/react';
import CatImage from '../pages/components/catImage';

describe('CatImage', () => {
  it('renders the cat image with the given src', () => {
    const { getByAltText } = render(<CatImage src="https://picsum.photos/200.jpg" />);
    const catImage = getByAltText('Random cat');
    expect(catImage).toBeInTheDocument();
    expect(catImage).toHaveAttribute('src', 'https://picsum.photos/200.jpg');
  });

  it('displays a shimmer effect when loading', () => {
    const { getByTestId } = render(<CatImage src="https://picsum.photos/200.jpg" />);
    const shimmerEffect = getByTestId('next-image-shimmer');
    expect(shimmerEffect).toBeInTheDocument();
  });
});
