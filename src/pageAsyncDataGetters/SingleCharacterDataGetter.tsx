import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { fetchCharacter } from '../store/SingleCharacterSlice';
import { Loading } from '../components/Loading/Loading';
import { ErrorModal } from '../components/Error/Error';
import { headingValue, Clipboard } from '../components/Clipboard/Clipboard';

const CharacterDetail = (props:{id: string}) => {
  const dispatch = useAppDispatch();
  const { character, planet, films, species, starships, vehicles, loading, hasErrors } = useAppSelector((state) => state.character);

  useEffect(() => {
    dispatch(fetchCharacter(props.id || "1"));
  },[dispatch, props.id]);

  if (loading) {
    return <Loading message="If you only knew the power of the dark side."/>;
  }

  if (hasErrors) {
    return <ErrorModal message="Error fetching character."/>;
  }
  
  let homeworld: string = character.homeworld === undefined ? "" : character.homeworld;

  let characterData: headingValue[] = [
    {
        heading: "Birth Year",
        value: character.birth_year
    },
    {
        heading: "Eye Colour",
        value: character.eye_color
    },
    {
        heading: "Gender",
        value: character.gender
    },
    {
        heading: "Hair Colour",
        value: character.hair_color
    },
    {
        heading: "Height",
        value: character.height + " cm"
    },
    {
        heading: "Mass",
        value: character.mass + " kg"
    },
    {
        heading: "Skin Colour",
        value: character.skin_color
    },
    {
        heading: "Home world",
        value: <Link to={`/planet/${homeworld.split('/').reverse()[1]}`}>{planet.name}</Link>
    },
    {
        heading: "Films",
        value:  <ul>
                    {films.map((film) => (
                        <li key={films.indexOf(film)}>{film.title}</li>
                    ))}
                </ul>
    },
    {
        heading: "Species",
        value:  <ul>
                    {species.map((specie) => (
                        <li key={species.indexOf(specie)}>{specie.name}</li>
                    ))}
                </ul>
    },
    {
        heading: "Star Ships",
        value:  <ul>
                    {starships.map((starship) => (
                        <li key={starships.indexOf(starship)}>
                            <Link to={`/starship/${starship.url!.split('/').reverse()[1]}`}>
                                {starship.name}
                            </Link>
                        </li>
                    ))}
                </ul>
    },
    {
        heading: "Vehicles",
        value:  <ul>
                    {vehicles.map((vehicle) => (
                        <li key={vehicles.indexOf(vehicle)}>{vehicle.name}</li>
                    ))}
                </ul>
    }
  ];
  
  return (
    <Container>
        <Clipboard title={character.name} data={characterData} columns={2}
            favourite={{character: character}}
        />     
    </Container>
  );
};

export default CharacterDetail;