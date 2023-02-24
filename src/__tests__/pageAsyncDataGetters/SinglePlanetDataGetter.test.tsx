import { render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { MemoryRouter } from 'react-router-dom';

import PlanetDetail from '../../pageAsyncDataGetters/SinglePlanetDataGetter';

jest.mock('../../store/store');

describe('PlanetDetail component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders loading message while loading', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ planet: {}, characters: [], films: [], loading: true, hasErrors: false });

    render(<PlanetDetail id="1" />, { wrapper: MemoryRouter });

    const loadingMessage = screen.getByText('The Force is strong with this one.');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('renders error message if there are errors', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ planet: {}, characters: [], films: [], loading: false, hasErrors: true });

    render(<PlanetDetail id="1" />, { wrapper: MemoryRouter });

    const errorMessage = screen.getByText('Error fetching planet.');
    expect(errorMessage).toBeInTheDocument();
  });

});