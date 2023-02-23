import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { addFavouriteCharacter, removeFavouriteCharacter } from '../../../store/FavouriteSlice';
import { FavouriteIcon } from '../../../components/Favourite/Favourite';
import { Character } from '../../../utils/interfaces';

jest.mock('../../../store/store');

describe('FavouriteIcon', () => {
  const mockCharacter = {
    name: 'Luke Skywalker',
    url: 'http://swapi.dev/api/people/1/',
  };

  const mockFavourites = {
    [mockCharacter.url!]: mockCharacter,
  };

  const mockEmptyFavourites = {
    ['']: {},
  };

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useAppSelector as jest.Mock).mockReturnValue(mockFavourites);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with an empty star if the character is not in favourites', () => {
    (useAppSelector as jest.Mock).mockReturnValue(mockEmptyFavourites);
    render(<FavouriteIcon character={mockCharacter} />);
    const emptyStarElement = screen.getByTestId('empty-star');
    expect(emptyStarElement).toBeInTheDocument();
  });

  it('renders the component with a filled star if the character is in favourites', () => {
    (useAppSelector as jest.Mock).mockReturnValue(mockFavourites);
    render(<FavouriteIcon character={mockCharacter} />);
    const filledStarElement = screen.getByTestId('filled-star');
    expect(filledStarElement).toBeInTheDocument();
  });

  it('calls addFavouriteCharacter dispatch function when empty star is clicked', () => {
    (useAppSelector as jest.Mock).mockReturnValue(mockEmptyFavourites);
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    render(<FavouriteIcon character={mockCharacter} />);
    const emptyStarElement = screen.getByTestId('empty-star');
    fireEvent.click(emptyStarElement);

    expect(mockDispatch).toHaveBeenCalledWith(addFavouriteCharacter(mockCharacter as Character));
  });

  it('calls removeFavouriteCharacter dispatch function when filled star is clicked', () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    render(<FavouriteIcon character={mockCharacter} />);
    const filledStarElement = screen.getByTestId('filled-star');
    fireEvent.click(filledStarElement);

    expect(mockDispatch).toHaveBeenCalledWith(removeFavouriteCharacter(mockCharacter));
  });
});
