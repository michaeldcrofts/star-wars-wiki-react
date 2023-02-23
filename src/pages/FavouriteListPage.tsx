import React, { ReactNode } from 'react';
import { useAppSelector } from '../store/store';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from '../components/Header';
import { BsStar } from 'react-icons/bs';

import SummaryCard, { headingValue } from '../components/SummaryCard/SummaryCard';

const FavouriteListPage = () => {
    const favourites = useAppSelector(state => state.favourite.favourites);

    const keys = Object.keys(favourites);
    const characterCards: ReactNode[] = [];
    for (let i = 0; i < keys.length; i++) {
        const characterAttributes: headingValue[] = [
            {
                heading: "Height",
                value: favourites[keys[i]].height
            },
            {
                heading: "Mass",
                value: favourites[keys[i]].mass
            },
            {
                heading: "Gender",
                value: favourites[keys[i]].gender
            }
        ];
        characterCards.push(
            <SummaryCard 
                title={favourites[keys[i]].name} 
                data={characterAttributes} 
                url={`/character/${keys[i].split('/').reverse()[1]}`} 
                favourite={{character: {url: keys[i]} } } 
            />
        );
    }
    
    return (
        <Container>
            <Header title="Star Wars Wiki: Favourite Characters" pageSelected="favourite"/>
            <Container>
                { characterCards.length ? (
                    <Row>
                        {characterCards.map((character) => (
                            <Col sm={6} md={4} lg={3} key={characterCards.indexOf(character)}>
                                {character}
                            </Col>
                        ))}
                    </Row>
                ) 
                : (
                    <SummaryCard 
                        title="Favourites" 
                        data={[
                            {
                                heading: <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span>Click the star icon:
                                            <BsStar style={{ marginLeft: '0.5rem', marginRight:'0.5rem' }} />
                                            on a character's page to add to your favourites.</span>
                                        </div>,
                                value:  ""
                            }]}
                        url=""
                    />
                )}
                
            </Container>
        </Container>
    );
};

export default FavouriteListPage;