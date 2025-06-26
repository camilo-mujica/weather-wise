import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

const setup = (props = {}) => {
  const setValue = jest.fn();
  const utils = render(
    <SearchBar value="" setValue={setValue} placeholder="Search..." {...props} />
  );
  const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
  return { ...utils, input, setValue };
};

describe('SearchBar', () => {
  it('renders input with placeholder', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe('Search...');
  });

  it('calls setValue on input change', () => {
    const { input, setValue } = setup();
    fireEvent.change(input, { target: { value: 'New York' } });
    expect(setValue).toHaveBeenCalledWith('New York');
  });

  it('shows clear button when value is not empty and clears on click', () => {
    const setValue = jest.fn();
    render(<SearchBar value="Paris" setValue={setValue} placeholder="Search..." />);
    const clearBtn = screen.getByLabelText('Clear search');
    expect(clearBtn).toBeInTheDocument();
    fireEvent.click(clearBtn);
    expect(setValue).toHaveBeenCalledWith('');
  });

  it('does not show clear button when value is empty', () => {
    setup();
    expect(screen.queryByLabelText('Clear search')).toBeNull();
  });

  it('applies error styles when error is true', () => {
    const { input } = setup({ error: true });
    expect(input.className).toMatch(/focus:ring-red-300/);
  });
});
