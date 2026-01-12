import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Input } from '@shared/ui/input/input';

export type AutocompleteProps = {
  onSelect: (value: string) => void;
  data: string[];
  placeholder?: string;
  disabled?: boolean;
  width?: string | number;
  maxResults?: number;
  debounceMs?: number;
  onSearch?: (value: string) => void;
  withSearchButton?: boolean;
  searchButtonLabel?: string;
};

export function Autocomplete({
  onSelect,
  data,
  placeholder = 'Type to search...',
  disabled = false,
  width = '100%',
  maxResults = 50,
  debounceMs = 300,
  onSearch,
  withSearchButton = false,
  searchButtonLabel = '검색',
}: AutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<number | undefined>(undefined);

  const filterData = useMemo(
    () => (query: string) => {
      if (!query || query.length === 0) {
        return [];
      }
      const filtered = data.filter((item) => item.includes(query));
      return filtered.slice(0, maxResults);
    },
    [data, maxResults]
  );

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const filtered = filterData(inputValue);
      setFilteredSuggestions(filtered);
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputValue, filterData, debounceMs]);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setIsOpen(true);
    setHighlighted(0);
  }, []);

  const handleSelect = useCallback(
    (value: string) => {
      setInputValue(value);
      setIsOpen(false);
      setHighlighted(-1);
      onSelect(value);
    },
    [onSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || filteredSuggestions.length === 0) return;
      if (e.key === 'ArrowDown') {
        setHighlighted((prev) => (prev + 1) % filteredSuggestions.length);
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setHighlighted(
          (prev) => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length
        );
        e.preventDefault();
      } else if (e.key === 'Enter' && highlighted >= 0) {
        handleSelect(filteredSuggestions[highlighted]);
        e.preventDefault();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setHighlighted(-1);
      }
    },
    [handleSelect, highlighted, isOpen, filteredSuggestions]
  );

  const handleBlur = useCallback(() => {
    setTimeout(() => setIsOpen(false), 100);
  }, []);

  return (
    <div className="relative" style={{ width: typeof width === 'number' ? `${width}px` : width }}>
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        withSearchIcon
        withSearchButton={withSearchButton}
        onSearchClick={() => onSearch?.(inputValue)}
        searchButtonLabel={searchButtonLabel}
      />
      {isOpen && filteredSuggestions.length > 0 && (
        <div
          ref={listRef}
          className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow-md max-h-50 overflow-y-auto z-10"
        >
          {filteredSuggestions.map((s, i) => (
            <div
              key={s}
              className={`px-3 py-2 cursor-pointer transition-colors ${
                i === highlighted
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'bg-white text-gray-900 font-normal hover:bg-gray-50'
              }`}
              onMouseDown={() => handleSelect(s)}
              onMouseEnter={() => setHighlighted(i)}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
