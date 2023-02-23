import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { fetchResults } from '../store/SearchSlice';
import { Loading } from '../components/Loading/Loading';
import { ErrorModal } from '../components/Error/Error';

const Search = (props: {searchText: string, selectedOption: string}) => {
  const dispatch = useAppDispatch();
  const { results, loading, hasErrors } = useAppSelector((state) => state.search)

  useEffect(() => {
    dispatch(fetchResults(props));
  },[dispatch, props]);

  if (loading) {
    return <Loading message="Search your feelings, you know it to be true."/>;
  }

  if (hasErrors) {
    return <ErrorModal message="Error fetching search results."/>;
  }
  return (
    <Container>
        <Card className="search-results-card">
            <Card.Header>
                <Card.Title>{`Results for '${props.searchText}'`}</Card.Title>
            </Card.Header>
            <Card.Body>
                    <ul className="search-results">
                        {results.map((result) => (
                            <li key={result.name}>
                                <Link to={`/${props.selectedOption}/${result.url.split('/').reverse()[1]}`}>{result.name}</Link>
                            </li>
                        ))}
                    </ul>
            </Card.Body>
        </Card>  
    </Container>
  );
};

export default Search;
