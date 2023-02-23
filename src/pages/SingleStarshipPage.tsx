import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { Header } from '../components/Header';
import StarshipDetail from '../pageAsyncDataGetters/SingleStarshipDataGetter';

const SingleStarshipPage = () => {
  const { id } = useParams();
  return (
      <Container>
          <Header title="Starship Information" />
          <StarshipDetail id={id || "1"} />
      </Container>
  );
};

export default SingleStarshipPage;