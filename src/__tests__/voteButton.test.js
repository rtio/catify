import { render, fireEvent } from '@testing-library/react';
import VoteButton from '../pages/components/voteButton';

describe('VoteButton', () => {
  it('should render a button with the provided vote text', () => {
    const { getByText } = render(<VoteButton vote={3} />);
    expect(getByText('3')).toBeInTheDocument();
  });

  it('should call the provided onClick function when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<VoteButton vote={3} onClick={handleClick} />);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should apply the provided color to the button', () => {
    const { getByRole } = render(<VoteButton vote={3} color="#ff0000" />);
    expect(getByRole('button')).toHaveStyle('background-color: #ff0000');
  });

  it('should apply the grayscale filter when the button is disabled', () => {
    const { getByRole } = render(<VoteButton vote={3} disabled={true} />);
    expect(getByRole('button')).toHaveStyle('filter: grayscale(100%)');
  });

  it('should disable the button when the disabled prop is set to true', () => {
    const { getByRole } = render(<VoteButton vote={3} disabled={true} />);
    expect(getByRole('button')).toBeDisabled();
  });
});
