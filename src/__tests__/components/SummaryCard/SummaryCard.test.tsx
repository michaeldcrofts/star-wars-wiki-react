import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SummaryCard, { headingValue } from '../../../components/SummaryCard/SummaryCard';

describe('SummaryCard', () => {
  const title = 'Card Title';
  const data: headingValue[] = [
    { heading: 'Name', value: 'John' },
    { heading: 'Age', value: 30 },
  ];
  const url = '/card-url';
  const character = { name: 'John Doe', url: 'https://example.com/john-doe' };

  it('renders card title and data', () => {
    render(
      <BrowserRouter>
        <SummaryCard title={title} data={data} url={url} />
      </BrowserRouter>
    );

    const cardTitle = screen.getByText(title);
    const name = screen.getByText('Name: John');
    const age = screen.getByText('Age: 30');

    expect(cardTitle).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(age).toBeInTheDocument();
  });

  it('renders a link with correct URL', () => {
    render(
      <BrowserRouter>
        <SummaryCard title={title} data={data} url={url} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', url);
  });
});
