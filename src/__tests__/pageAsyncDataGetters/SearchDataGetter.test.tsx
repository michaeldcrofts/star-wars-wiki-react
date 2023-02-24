import { render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Search from '../../pageAsyncDataGetters/SearchDataGetter';

jest.mock('../../store/store');

describe('Search component', () => {
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders a loading message while loading', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ results: [], loading: true, hasErrors: false });

    render(<Search searchText="lightsaber" selectedOption="films" />);

    const loadingMessage = screen.getByText("Search your feelings, you know it to be true.");
    expect(loadingMessage).toBeInTheDocument();
  });

  it('renders an error message if there are errors', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ results: [], loading: false, hasErrors: true });

    render(<Search searchText="lightsaber" selectedOption="films" />);

    const errorMessage = screen.getByText("Error fetching search results.");
    expect(errorMessage).toBeInTheDocument();
  });

});
