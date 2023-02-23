import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { Header } from '../components/Header';

import Search from '../pageAsyncDataGetters/SearchDataGetter'

const SearchPage = () => {
  const {searchText, selectedOption} = useParams();
  return (
      <Container>
          <Header title={`Search ${selectedOption}`} selectedOption = {selectedOption} />
          <Search searchText={searchText!} selectedOption={selectedOption!} />
      </Container>
  );
};

export default SearchPage;

