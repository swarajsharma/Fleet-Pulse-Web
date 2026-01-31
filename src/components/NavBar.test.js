import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  const renderNavBar = () => {
    return render(
      <Router>
        <NavBar />
      </Router>
    );
  };

  test('renders navbar without crashing', () => {
    renderNavBar();
    expect(screen.getByText('Fleet-Pulse-Web')).toBeInTheDocument();
  });

  test('renders all navigation links', () => {
    renderNavBar();
    
    const expectedLinks = [
      'Home',
      'Business',
      'Entertainment',
      'General',
      'Health',
      'Science',
      'Sports',
      'Technology'
    ];

    expectedLinks.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });
  });

  test('navbar has correct CSS classes', () => {
    renderNavBar();
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('navbar', 'navbar-dark', 'bg-dark');
  });

  test('brand link points to home', () => {
    renderNavBar();
    const brandLink = screen.getByText('Fleet-Pulse-Web');
    expect(brandLink).toHaveAttribute('href', '/');
  });

  test('category links have correct paths', () => {
    renderNavBar();
    
    expect(screen.getByText('Business').closest('a')).toHaveAttribute('href', '/business');
    expect(screen.getByText('Technology').closest('a')).toHaveAttribute('href', '/technology');
    expect(screen.getByText('Sports').closest('a')).toHaveAttribute('href', '/sports');
  });
});
