import { render, screen, fireEvent } from '@testing-library/react';
import AddressButtonTag from './AddressButtonTag';

describe('AddressButtonTag', () => {
  const addr = '123 Main St, City, Country';
  const setAddress = jest.fn();
  const handleRemoveFromHistory = jest.fn();

  beforeEach(() => {
    setAddress.mockClear();
    handleRemoveFromHistory.mockClear();
  });

  it('renders the address', () => {
    render(
      <AddressButtonTag
        addr={addr}
        setAddress={setAddress}
        handleRemoveFromHistory={handleRemoveFromHistory}
      />
    );
    expect(screen.getByText(addr)).toBeInTheDocument();
  });

  it('calls setAddress when the button is clicked', () => {
    render(
      <AddressButtonTag
        addr={addr}
        setAddress={setAddress}
        handleRemoveFromHistory={handleRemoveFromHistory}
      />
    );
    fireEvent.click(screen.getByText(addr));
    expect(setAddress).toHaveBeenCalledWith(addr);
  });

  it('calls handleRemoveFromHistory when the remove (×) is clicked', () => {
    render(
      <AddressButtonTag
        addr={addr}
        setAddress={setAddress}
        handleRemoveFromHistory={handleRemoveFromHistory}
      />
    );
    fireEvent.click(screen.getByText('×'));
    expect(handleRemoveFromHistory).toHaveBeenCalledWith(addr);
    expect(setAddress).not.toHaveBeenCalled();
  });

  it('does not call setAddress when the remove (×) is clicked', () => {
    render(
      <AddressButtonTag
        addr={addr}
        setAddress={setAddress}
        handleRemoveFromHistory={handleRemoveFromHistory}
      />
    );
    fireEvent.click(screen.getByText('×'));
    expect(setAddress).not.toHaveBeenCalled();
  });

  it('does not render the remove button when showRemoveButton is false', () => {
    render(
      <AddressButtonTag
        addr={addr}
        setAddress={setAddress}
        handleRemoveFromHistory={handleRemoveFromHistory}
        showRemoveButton={false}
      />
    );
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });
});
