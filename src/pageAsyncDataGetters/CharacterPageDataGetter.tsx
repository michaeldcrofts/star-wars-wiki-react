import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Row, Col, Container } from 'react-bootstrap';

import { fetchCharacters } from '../store/CharacterListSlice';
import SummaryCard from '../components/SummaryCard/SummaryCard';
import { Loading } from '../components/Loading/Loading';
import { ErrorModal } from '../components/Error/Error';

import { headingValue } from '../components/SummaryCard/SummaryCard';

const CharacterList = () => {
    const dispatch = useAppDispatch();
    const { characters, loading, hasErrors } = useAppSelector((state) => state.homeCharacters);

    useEffect(() => {
        dispatch(fetchCharacters('?page=1'));
    }, [dispatch]);

    if (loading) {
        return <Loading message="A long time ago in a galaxy far, far away…"/>;
    }

    if (hasErrors) {
        return <ErrorModal message="Error fetching characters." />;
    }

    const characterCards: ReactNode[] = [];
    for (let i = 0; i < characters.length; i++) {
        const characterAttributes: headingValue[] = [
            {
                heading: "Height",
                value: characters[i].height
            },
            {
                heading: "Mass",
                value: characters[i].mass
            },
            {
                heading: "Gender",
                value: characters[i].gender
            }
        ];
        characterCards.push(
            <SummaryCard title={characters[i].name} data={characterAttributes} url={`/character/${characters[i].url.split('/').reverse()[1]}`} />
        );
        
    }

    return (
        <Container>
            <Row>
                {characterCards.map((character) => (
                    <Col sm={6} md={4} lg={3} key={characterCards.indexOf(character)}>
                        {character}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CharacterList;
