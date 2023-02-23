import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { Header } from '../components/Header';
import CharacterDetail from '../pageAsyncDataGetters/SingleCharacterDataGetter';

const SingleCharacterPage = () => {
  const { id } = useParams();
  return (
      <Container>
          <Header title="Character Information" />
          <CharacterDetail id={id || "1"} />
      </Container>
  );
};

export default SingleCharacterPage;

