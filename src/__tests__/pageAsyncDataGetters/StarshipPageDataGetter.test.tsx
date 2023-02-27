import { render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { MemoryRouter } from 'react-router-dom';
import StarshipList from '../../pageAsyncDataGetters/StarshipPageDataGetter';

jest.mock('../../store/store');

describe('StarshipList component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders loading message while loading', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ starships: [], loading: true, hasErrors: false });

    render(<StarshipList />, { wrapper: MemoryRouter });

    const loadingMessage = screen.getByText('Do. Or do not. There is no try.');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('renders error message if there are errors', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ starships: [], loading: false, hasErrors: true });

    render(<StarshipList />, { wrapper: MemoryRouter });

    const errorMessage = screen.getByText('Error fetching starships.');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders starship summary cards when loaded', () => {
    const mockStarships = [
      {
        name: 'Test Starship 1',
        model: 'Test Model 1',
        hyperdrive_rating: '1.0',
        crew: 'Test Crew 1',
        url: 'https://swapi.dev/api/starships/1/',
      },
      {
        name: 'Test Starship 2',
        model: 'Test Model 2',
        hyperdrive_rating: '2.0',
        crew: 'Test Crew 2',
        url: 'https://swapi.dev/api/starships/2/',
      },
    ];

    (useAppSelector as jest.Mock).mockReturnValue({ starships: mockStarships, loading: false, hasErrors: false });

    render(<StarshipList />, { wrapper: MemoryRouter });

    expect(screen.getByText('Test Starship 1')).toBeInTheDocument();
    expect(screen.getByText('Model: Test Model 1')).toBeInTheDocument();
    expect(screen.getByText('Hyperdrive Rating: 1.0')).toBeInTheDocument();
    expect(screen.getByText('Crew: Test Crew 1')).toBeInTheDocument();

    expect(screen.getByText('Test Starship 2')).toBeInTheDocument();
    expect(screen.getByText('Model: Test Model 2')).toBeInTheDocument();
    expect(screen.getByText('Hyperdrive Rating: 2.0')).toBeInTheDocument();
    expect(screen.getByText('Crew: Test Crew 2')).toBeInTheDocument();
  });
});
