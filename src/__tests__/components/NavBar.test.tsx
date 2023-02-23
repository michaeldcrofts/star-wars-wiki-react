import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SearchBar from '../../components/NavBar';

describe('SearchBar', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
  });

  it('updates the search text on input change', () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Luke Skywalker' } });
    expect((searchInput as HTMLInputElement).value).toBe('Luke Skywalker');
  });

  it('navigates to the search results page on form submit', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    expect(window.location.pathname).toBe('/search//character');
  });
});
