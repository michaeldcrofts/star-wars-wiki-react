import { render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import CharacterDetail from '../../pageAsyncDataGetters/SingleCharacterDataGetter';

jest.mock('../../store/store');

describe('CharacterDetail component', () => {
  
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders loading message while loading', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ character: {}, planet: {}, films: [], species: [], starships: [], vehicles: [], loading: true, hasErrors: false });

    render(<CharacterDetail id="1" />);

    const loadingMessage = screen.getByText('If you only knew the power of the dark side.');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('renders error message if there are errors', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ character: {}, planet: {}, films: [], species: [], starships: [], vehicles: [], loading: false, hasErrors: true });

    render(<CharacterDetail id="1" />);

    const errorMessage = screen.getByText('Error fetching character.');
    expect(errorMessage).toBeInTheDocument();
  });

});
