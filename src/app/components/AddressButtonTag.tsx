interface AddressButtonTagProps {
  addr: string;
  setAddress: (address: string) => void;
  handleRemoveFromHistory?: (address: string) => void;
  showRemoveButton?: boolean; // Optional prop to control visibility of the remove button
}

const AddressButtonTag = ({
  addr,
  setAddress,
  handleRemoveFromHistory,
  showRemoveButton = true, // Default to true if not provided
}: AddressButtonTagProps) => {
  return (
    <button
      onClick={() => setAddress(addr)}
      className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 rounded-full text-sm transition shadow-sm cursor-pointer"
    >
      <span>{addr}</span>
      {showRemoveButton && (
        <span
          className="ml-2 text-slate-500 hover:text-slate-700"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFromHistory?.(addr);
          }}
        >
          &times;
        </span>
      )}
    </button>
  );
};

export default AddressButtonTag;
