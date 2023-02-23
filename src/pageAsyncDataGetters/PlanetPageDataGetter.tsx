import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Row, Col, Container } from 'react-bootstrap';

import { fetchPlanets } from '../store/PlanetListSlice';
import SummaryCard from '../components/SummaryCard/SummaryCard';
import { Loading } from '../components/Loading/Loading';
import { ErrorModal } from '../components/Error/Error';

import { headingValue } from '../components/SummaryCard/SummaryCard';

const PlanetList = () => {
    const dispatch = useAppDispatch();
    const { planets, loading, hasErrors } = useAppSelector((state) => state.homePlanets);

    useEffect(() => {
    dispatch(fetchPlanets('?page=1'));
    }, [dispatch]);

    if (loading) {
        return <Loading message="May the Force be with you."/>;
    }

    if (hasErrors) {
        return <ErrorModal message="Error fetching planets." />;
    }

    const planetCards: ReactNode[] = []
    for (let i = 0; i < planets.length; i++) {
        const planetAttributes: headingValue[] = [
            {
                heading: "Population",
                value: planets[i].population
            },
            {
                heading: "Terrain",
                value: planets[i].terrain
            },
            {
                heading: "Orbital Period",
                value: planets[i].orbital_period
            }
        ];
        planetCards.push(
            <SummaryCard title={planets[i].name} data={planetAttributes} url={`/planet/${planets[i].url.split('/').reverse()[1]}`} />
        );
        
    }

    return (
        <Container>
            <Row>
                {planetCards.map((planet) => (
                    <Col sm={6} md={4} lg={3} key={planetCards.indexOf(planet)}>
                        {planet}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PlanetList;
