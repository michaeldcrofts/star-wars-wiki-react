import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import CharacterListPage from '../../pages/CharacterListPage';

const initialState = {
    homeCharacters: {
      characters: [
        {
            "name": "Luke Skywalker",
            "url": "https://swapi.dev/api/people/1/"
        },
        {
            "name": "C-3PO",
            "url": "https://swapi.dev/api/people/2/"
        },
      ],
      loading: false,
      hasErrors: false,
    },
  };
  
const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

describe('CharacterListPage', () => {

  it('renders the Header component', () => {  
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterListPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Star Wars Wiki: Characters/i)).toBeInTheDocument();
  });

  it('renders the CharacterList component', () => {   
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterListPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/C-3PO/i)).toBeInTheDocument();
  });
});
