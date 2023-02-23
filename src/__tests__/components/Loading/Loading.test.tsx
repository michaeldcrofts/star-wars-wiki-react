import { render, screen } from '@testing-library/react';
import { Loading } from '../../../components/Loading/Loading';

describe('Loading component', () => {
  test('renders loading message', () => {
    render(<Loading message="Loading data..." />);
    const loadingMessage = screen.getByText('Loading data...');
    expect(loadingMessage).toBeInTheDocument();
  });

  test('renders loading animation', () => {
    render(<Loading message="Loading data..." />);
    const loadingAnimation = screen.getByTestId('loading-animation');
    expect(loadingAnimation).toBeInTheDocument();
  });
});
