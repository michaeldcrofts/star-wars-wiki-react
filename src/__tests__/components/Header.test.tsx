import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Header } from '../../components/Header';

describe('Header component', () => {
  it('should render the Star Wars logo', () => {
    render(
      <MemoryRouter>
        <Header title="Test Title" />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('Star Wars Logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render the title', () => {
    render(
      <MemoryRouter>
        <Header title="Test Title" />
      </MemoryRouter>
    );

    const title = screen.getByText('Test Title');
    expect(title).toBeInTheDocument();
  });

});
