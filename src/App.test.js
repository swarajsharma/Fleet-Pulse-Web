import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders NavBar component', () => {
    render(<App />);
    const navbarElements = screen.getAllByText(/Fleet-Pulse-Web/i);
    expect(navbarElements.length).toBeGreaterThan(0);
  });

  test('renders navigation links', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Business')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
  });
});
