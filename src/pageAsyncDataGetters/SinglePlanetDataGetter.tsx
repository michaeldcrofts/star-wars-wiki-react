import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { fetchPlanet } from '../store/SinglePlanetSlice';
import { Loading } from '../components/Loading/Loading';
import { ErrorModal } from '../components/Error/Error';
import { headingValue, Clipboard } from '../components/Clipboard/Clipboard';


const PlanetDetail = (props:{id: string}) => {
  const dispatch = useAppDispatch();
  const { planet, characters, films, loading, hasErrors } = useAppSelector((state) => state.planet)

  useEffect(() => {
    dispatch(fetchPlanet(props.id || "1"));
  },[dispatch, props.id]);

  if (loading) {
    return <Loading message="The Force is strong with this one."/>;
  }

  if (hasErrors) {
    return <ErrorModal message="Error fetching planet."/>;
  }
  
 let planetData: headingValue[] = [
    {
        heading: "Diameter",
        value: planet.diameter
    },
    {
        heading: "Rotation Period",
        value: planet.rotation_period
    },
    {
        heading: "Orbital Period",
        value: planet.orbital_period
    },
    {
        heading: "Gravity",
        value: planet.gravity
    },
    {
        heading: "Population",
        value: planet.population
    },
    {
        heading: "Climate",
        value: planet.climate
    },
    {
        heading: "Terrain",
        value: planet.terrain
    },
    {
        heading: "Surface Water",
        value: planet.surface_water
    },
    {
        heading: "Residents",
        value:  <ul>
                    {characters.map((character) => (
                        <li key={characters.indexOf(character)}><Link to={`/character/${character.url!.split('/').reverse()[1]}`}>{character.name}</Link></li>
                    ))}
                </ul>
    },
    {
        heading: "Films",
        value:  <ul>
                    {films.map((film) => (
                        <li key={films.indexOf(film)}>{film.title}</li>
                    ))}
                </ul>
    }
  ];

  return (
    <Container>
        <Clipboard title={planet.name} data={planetData} columns={2}/>     
    </Container>
  );
};

export default PlanetDetail;
