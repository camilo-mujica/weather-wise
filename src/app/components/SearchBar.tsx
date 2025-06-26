import clsx from 'clsx';
import { MapPin, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  setValue: (address: string) => void;
  placeholder?: string;
  error?: boolean;
}

const SearchBar = ({ value, setValue, placeholder, error }: SearchBarProps) => {
  return (
    <div
      className={clsx(
        'relative flex-1 bg-white rounded-lg shadow-md border',
        error ? 'border-red-200' : 'border-slate-200'
      )}
    >
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={clsx(
          'pl-10 pr-10 w-full h-12 focus:outline-none text-gray-800 text-lg placeholder-gray-400 rounded-lg focus:ring-2 transition-colors duration-200',
          error ? 'focus:ring-red-300' : 'focus:ring-slate-300'
        )}
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
