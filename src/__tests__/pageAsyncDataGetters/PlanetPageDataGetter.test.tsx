import { render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import PlanetList from '../../pageAsyncDataGetters/PlanetPageDataGetter';

jest.mock('../../store/store');

describe('PlanetList component', () => {

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders a loading message while loading', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ planets: [], loading: true, hasErrors: false });

    render(<PlanetList />);

    const loadingMessage = screen.getByText('May the Force be with you.');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('renders an error message if there are errors', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ planets: [], loading: false, hasErrors: true });

    render(<PlanetList />);

    const errorMessage = screen.getByText('Error fetching planets.');
    expect(errorMessage).toBeInTheDocument();
  });

});
