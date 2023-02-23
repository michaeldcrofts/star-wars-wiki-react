import { Container } from 'react-bootstrap';

import { Header } from '../components/Header';
import StarshipList from '../pageAsyncDataGetters/StarshipPageDataGetter';

const StarshipListPage = () => {

    return (
        <Container>
            <Header title="Star Wars Wiki: Starships" pageSelected="starship" />
            <StarshipList />
        </Container>
    );
};

export default StarshipListPage;