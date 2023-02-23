import { render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import CharacterList from '../../pageAsyncDataGetters/CharacterPageDataGetter';

jest.mock('../../store/store');

describe('CharacterList', () => {
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  }); 

  afterEach(() => {
    jest.clearAllMocks();
  });


 it('renders a loading message when loading', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      characters: [],
      loading: true,
      hasErrors: false,
    });
    render(<CharacterList />);
    expect(screen.getByText('A long time ago in a galaxy far, far away…')).toBeInTheDocument();
  });

  it('renders an error modal when hasErrors is true', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      characters: [],
      loading: false,
      hasErrors: true,
    });
    render(<CharacterList />);
    expect(screen.getByText('Error fetching characters.')).toBeInTheDocument();
  });
});
