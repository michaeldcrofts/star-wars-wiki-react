import { Container } from 'react-bootstrap';

import { Header } from '../components/Header';
import CharacterList from '../pageAsyncDataGetters/CharacterPageDataGetter';

const CharacterListPage = () => {

    return (
        <Container>
            <Header title="Star Wars Wiki: Characters" pageSelected="character"/>
            <CharacterList />
        </Container>
    );
};

export default CharacterListPage;