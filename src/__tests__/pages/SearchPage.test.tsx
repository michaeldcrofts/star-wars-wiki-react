import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import SearchPage from '../../pages/SearchPage';
import { getResults } from '../../store/SearchSlice';

const initialState = {
  search: {
    results: [
      {
        "name": "Luke Skywalker",
        "url": "https://swapi.dev/api/people/1/"
      },
      {
        "name": "Darth Vader",
        "url": "https://swapi.dev/api/people/4/"
      },
    ],
    loading: false,
    hasErrors: false,
  },
};

const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

describe('SearchPage', () => {
  
  it('renders the Search component with the correct data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
  });

  it('dispatches the getResults action', () => {
    const searchText = 'Luke';
    const selectedOption = 'characters';
    const expectedAction = getResults();

   render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/search/${searchText}/${selectedOption}`]}>
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
