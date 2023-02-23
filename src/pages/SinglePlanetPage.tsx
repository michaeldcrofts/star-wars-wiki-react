import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { Header } from '../components/Header';
import PlanetDetail from '../pageAsyncDataGetters/SinglePlanetDataGetter';

const SinglePlanetPage = () => {
  const { id } = useParams();
  return (
      <Container>
          <Header title="Planet Information" />
          <PlanetDetail id={id || "1"} />
      </Container>
  );
};

export default SinglePlanetPage;