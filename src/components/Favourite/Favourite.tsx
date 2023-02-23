import { useAppDispatch, useAppSelector } from '../../store/store';
import { BsStar, BsStarFill } from 'react-icons/bs';

import { Character } from '../../utils/interfaces';

import { addFavouriteCharacter, removeFavouriteCharacter } from '../../store/FavouriteSlice';

import './Favourite.css';

export const FavouriteIcon = (props:{character: Partial<Character>}) => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(state => state.favourite.favourites);

  const isFavourite = (favourites.hasOwnProperty(props.character.url!)) ? true: false;
  const handleClick = () => {
    if (isFavourite) {
      dispatch(removeFavouriteCharacter(props.character));
    } else {
      dispatch(addFavouriteCharacter(props.character as Character));
    }
  };

  return (
    <div onClick={handleClick}>
      {isFavourite ? (
        <BsStarFill data-testid="filled-star" className="favourite-star filled" />
      ) : (
        <BsStar data-testid="empty-star" className="favourite-star empty"/>
      )}
    </div>
  );
}
