import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Row, Col, Container } from 'react-bootstrap';

import { fetchStarships } from '../store/StarshipListSlice';
import SummaryCard from '../components/SummaryCard/SummaryCard';
import { Loading } from '../components/Loading/Loading';
import { ErrorModal } from '../components/Error/Error';

import { headingValue } from '../components/SummaryCard/SummaryCard';

const StarshipList = () => {
    const dispatch = useAppDispatch();
    const { starships, loading, hasErrors } = useAppSelector((state) => state.homeStarships);

    useEffect(() => {
    dispatch(fetchStarships('?page=1'));
    }, [dispatch]);

    if (loading) {
        return <Loading message="Do. Or do not. There is no try."/>;
    }

    if (hasErrors) {
        return <ErrorModal message="Error fetching starships." />;
    }

    const starshipCards: ReactNode[] = []
    for (let i = 0; i < starships.length; i++) {
        const starshipAttributes: headingValue[] = [
            {
                heading: "Model",
                value: starships[i].model
            },
            {
                heading: "Hyperdrive Rating",
                value: starships[i].hyperdrive_rating
            },
            {
                heading: "Crew",
                value: starships[i].crew
            }
        ];
        starshipCards.push(
            <SummaryCard title={starships[i].name} data={starshipAttributes} url={`/starship/${starships[i].url.split('/').reverse()[1]}`} />
        );
        
    }

    return (
        <Container>
            <Row>
                {starshipCards.map((starship) => (
                    <Col sm={6} md={4} lg={3} key={starshipCards.indexOf(starship)}>
                        {starship}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default StarshipList;
