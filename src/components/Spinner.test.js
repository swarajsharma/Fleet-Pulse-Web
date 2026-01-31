import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner Component', () => {
  test('renders spinner without crashing', () => {
    render(<Spinner />);
  });

  test('renders loading image', () => {
    render(<Spinner />);
    const loadingImage = screen.getByAltText('loading');
    expect(loadingImage).toBeInTheDocument();
  });

  test('spinner container has correct CSS class', () => {
    const { container } = render(<Spinner />);
    const spinnerDiv = container.querySelector('.text-center');
    expect(spinnerDiv).toBeInTheDocument();
  });

  test('loading image has correct attributes', () => {
    render(<Spinner />);
    const loadingImage = screen.getByAltText('loading');
    expect(loadingImage).toHaveClass('my-3');
  });
});
