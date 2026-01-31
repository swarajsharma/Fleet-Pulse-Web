import { render, screen } from '@testing-library/react';
import NewsItem from './NewsItem';

describe('NewsItem Component', () => {
  const mockProps = {
    title: 'Test News Title',
    description: 'Test news description',
    imageUrl: 'https://test-image.com/image.jpg',
    newsUrl: 'https://test-news.com/article',
    author: 'Test Author',
    date: '2026-01-31T10:00:00Z',
    source: 'Test Source'
  };

  test('renders news item with all props', () => {
    render(<NewsItem {...mockProps} />);
    
    expect(screen.getByText('Test News Title')).toBeInTheDocument();
    expect(screen.getByText('Test news description')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
  });

  test('displays author information', () => {
    render(<NewsItem {...mockProps} />);
    expect(screen.getByText(/By Test Author/i)).toBeInTheDocument();
  });

  test('displays "Unknown" when author is not provided', () => {
    const propsWithoutAuthor = { ...mockProps, author: null };
    render(<NewsItem {...propsWithoutAuthor} />);
    expect(screen.getByText(/By Unknown/i)).toBeInTheDocument();
  });

  test('renders image with correct src', () => {
    render(<NewsItem {...mockProps} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProps.imageUrl);
  });

  test('renders default image when imageUrl is not provided', () => {
    const propsWithoutImage = { ...mockProps, imageUrl: null };
    render(<NewsItem {...propsWithoutImage} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg');
  });

  test('renders "Read More" link with correct href', () => {
    render(<NewsItem {...mockProps} />);
    const link = screen.getByText('Read More');
    expect(link).toHaveAttribute('href', mockProps.newsUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  test('displays formatted date', () => {
    render(<NewsItem {...mockProps} />);
    const dateText = screen.getByText(/Sat, 31 Jan 2026/i);
    expect(dateText).toBeInTheDocument();
  });

  test('renders badge with source name', () => {
    render(<NewsItem {...mockProps} />);
    const badge = screen.getByText('Test Source');
    expect(badge).toHaveClass('badge', 'rounded-pill', 'bg-danger');
  });
});
