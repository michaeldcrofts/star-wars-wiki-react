import { render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { MemoryRouter } from 'react-router-dom';

import StarshipDetail from '../../pageAsyncDataGetters/SingleStarshipDataGetter';

jest.mock('../../store/store');

describe('StarshipDetail component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders loading message while loading', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ starship: {}, characters: [], films: [], loading: true, hasErrors: false });

    render(<StarshipDetail id="1" />, { wrapper: MemoryRouter });

    const loadingMessage = screen.getByText('Remember…the Force will be with you, always.');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('renders error message if there are errors', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ starship: {}, characters: [], films: [], loading: false, hasErrors: true });

    render(<StarshipDetail id="1" />, { wrapper: MemoryRouter });

    const errorMessage = screen.getByText('Error fetching starship.');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders starship details when loaded', () => {
    const mockStarship = {
      name: 'Test Starship',
      model: 'Test Model',
      starship_class: 'Test Starship Class',
      manufacturer: 'Test Manufacturer',
      cost_in_credits: '100',
      length: '20',
      crew: 'Test Crew',
      passengers: 'Test Passengers',
      max_atmosphering_speed: '1000',
      hyperdrive_rating: '1.0',
      MGLT: '100',
      cargo_capacity: 'Test Cargo Capacity',
      consumables: 'Test Consumables',
    };
    const mockCharacters = [{ name: 'Test Character 1', url: 'https://swapi.dev/api/people/1/' }, { name: 'Test Character 2', url: 'https://swapi.dev/api/people/2/' }];
    const mockFilms = [{ title: 'Test Film 1' }, { title: 'Test Film 2' }];

    (useAppSelector as jest.Mock).mockReturnValue({ starship: mockStarship, characters: mockCharacters, films: mockFilms, loading: false, hasErrors: false });

    render(<StarshipDetail id="1" />, { wrapper: MemoryRouter });

    expect(screen.getByText(mockStarship.name)).toBeInTheDocument();
    expect(screen.getByText(mockStarship.model)).toBeInTheDocument();
    expect(screen.getByText(mockStarship.starship_class)).toBeInTheDocument();
    expect(screen.getByText(mockStarship.manufacturer)).toBeInTheDocument();
    expect(screen.getByText(`${mockStarship.length} m`)).toBeInTheDocument();
    expect(screen.getByText(mockStarship.crew)).toBeInTheDocument();
    expect(screen.getByText(mockStarship.passengers)).toBeInTheDocument();
    expect(screen.getByText(mockStarship.max_atmosphering_speed)).toBeInTheDocument();
    expect(screen.getByText(mockStarship.hyperdrive_rating)).toBeInTheDocument();
    expect(screen.getByText(mockStarship.cargo_capacity)).toBeInTheDocument();
    expect(screen.getByText(mockStarship.consumables)).toBeInTheDocument();
});
});
