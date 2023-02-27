import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import FavouriteListPage from '../../pages/FavouriteListPage';

const initialState = {
    favourite: {
      favourites: {
        "https://swapi.dev/api/people/1/": {
            "name": "Luke Skywalker",
            "height": "172",
            "mass": "77",
            "gender": "male"
        },
        "https://swapi.dev/api/people/2/": {
            "name": "C-3PO",
            "height": "167",
            "mass": "75",
            "gender": "n/a"
        },
      }
    },
};
const emptyState = {
    favourite: {
      favourites: {
      }
    },
};
  
const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

describe('FavouriteListPage', () => {
  it('renders the Header component with the correct title', () => {  
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavouriteListPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Star Wars Wiki: Favourite Characters/i)).toBeInTheDocument();
  });

  it('renders the SummaryCard components with favourite characters data', () => {   
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavouriteListPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();

    expect(screen.getByText(/C-3PO/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 167/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 75/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: n\/a/i)).toBeInTheDocument();
  });

  it('renders the SummaryCard component with instructions when there are no favourite characters', () => { 
    const emptyStore = mockStore(emptyState);  
    render(
      <Provider store={emptyStore}>
        <MemoryRouter>
          <FavouriteListPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText(/Luke Skywalker/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/C-3PO/i)).not.toBeInTheDocument();

    expect(screen.getByText(/Click the star icon:/i)).toBeInTheDocument();
    expect(screen.getByText(/on a character's page to add to your favourites./i)).toBeInTheDocument();
  });
});
