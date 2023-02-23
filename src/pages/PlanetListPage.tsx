import { Container } from 'react-bootstrap';

import { Header } from '../components/Header';
import PlanetList from '../pageAsyncDataGetters/PlanetPageDataGetter';

const PlanetListPage = () => {

    return (
        <Container>
            <Header title="Star Wars Wiki: Planets" pageSelected="planet"/>
            <PlanetList />
        </Container>
    );
};

export default PlanetListPage;