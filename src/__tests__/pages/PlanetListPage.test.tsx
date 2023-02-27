import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import PlanetListPage from '../../pages/PlanetListPage';

const initialState = {
  homePlanets: {
    planets: [
      {
        "name": "Tatooine",
        "url": "https://swapi.dev/api/planets/1/"
      },
      {
        "name": "Alderaan",
        "url": "https://swapi.dev/api/planets/2/"
      },
    ],
    loading: false,
    hasErrors: false,
  },
};

const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

describe('PlanetListPage', () => {

  it('renders the Header component with the correct title', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlanetListPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Star Wars Wiki: Planets/i)).toBeInTheDocument();
  });

  it('renders the PlanetList component with the correct data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlanetListPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    expect(screen.getByText(/Alderaan/i)).toBeInTheDocument();
  });
});
