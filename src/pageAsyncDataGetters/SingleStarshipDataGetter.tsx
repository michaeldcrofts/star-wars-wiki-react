import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { fetchStarship } from '../store/SingleStarshipSlice';
import { Loading } from '../components/Loading/Loading';
import { ErrorModal } from '../components/Error/Error';
import { headingValue, Clipboard } from '../components/Clipboard/Clipboard';


const StarshipDetail = (props:{id: string}) => {
  const dispatch = useAppDispatch();
  const { starship, characters, films, loading, hasErrors } = useAppSelector((state) => state.starship)

  useEffect(() => {
    dispatch(fetchStarship(props.id || "1"));
  },[dispatch, props.id]);

  if (loading) {
    return <Loading message="Remember…the Force will be with you, always."/>;
  }

  if (hasErrors) {
    return <ErrorModal message="Error fetching starship."/>;
  }
  
 let starshipData: headingValue[] = [
    {
        heading: "Model",
        value: starship.model
    },
    {
        heading: "Starship Class",
        value: starship.starship_class
    },
    {
        heading: "Manufacturer",
        value: starship.manufacturer
    },
    {
        heading: "Cost in Credits",
        value: starship.cost_in_credits
    },
    {
        heading: "Length",
        value: starship.length + " m"
    },
    {
        heading: "Crew",
        value: starship.crew
    },
    {
        heading: "Passengers",
        value: starship.passengers
    },
    {
        heading: "Max Atmosphering Speed",
        value: starship.max_atmosphering_speed
    },
    {
        heading: "Hyperdrive Rating",
        value: starship.hyperdrive_rating
    },
    {
        heading: "MGLT",
        value: starship.MGLT
    },
    {
        heading: "Cargo Capacity",
        value: starship.cargo_capacity
    },
    {
        heading: "Consumables",
        value: starship.consumables
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
        heading: "Pilots",
        value:  <ul>
                    {characters.map((character) => (
                        <li key={characters.indexOf(character)}><Link to={`/character/${character.url!.split('/').reverse()[1]}`}>{character.name}</Link></li>
                    ))}
                </ul>
    }    
  ];

  return (
    <Container>
        <Clipboard title={starship.name} data={starshipData} columns={2}/>     
    </Container>
  );
};

export default StarshipDetail;
