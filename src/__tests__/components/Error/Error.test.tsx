import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorModal } from '../../../components/Error/Error';
import userEvent from "@testing-library/user-event";

describe('ErrorModal component', () => {
  it('renders the modal with the correct message', () => {
    const errorMessage = 'Test error message';
    render(<ErrorModal message={errorMessage} />);
    const modalBody = screen.getByText(errorMessage);
    expect(modalBody).toBeInTheDocument();
  });

});
