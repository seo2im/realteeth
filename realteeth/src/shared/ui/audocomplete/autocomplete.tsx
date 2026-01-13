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
  maxResults = 20,
  debounceMs = 300,
  onSearch,
  withSearchButton = false,
  searchButtonLabel = '검색',
}: AutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<number | undefined>(undefined);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pagedSuggestions = filteredSuggestions.slice(page * maxResults, (page + 1) * maxResults);

  useEffect(() => {
    if (highlighted >= 0 && itemRefs.current[highlighted]) {
      if (highlighted === pagedSuggestions.length - 1 && listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      } else {
        itemRefs.current[highlighted]?.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlighted, page, pagedSuggestions.length]);

  const filterData = useMemo(
    () => (query: string) => {
      if (!query || query.length === 0) {
        return [];
      }
      const filtered = data.filter((item) => item.includes(query));
      return filtered;
    },
    [data]
  );
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [page]);

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
    setPage(0);
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
      if (!isOpen || pagedSuggestions.length === 0) return;
      if (e.key === 'ArrowDown') {
        setHighlighted((prev) => {
          const maxIdx = pagedSuggestions.length - 1;
          if (prev < 0) return 0;
          if (prev < maxIdx) return prev + 1;
          return maxIdx;
        });
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setHighlighted((prev) => {
          if (prev > 0) return prev - 1;
          return 0;
        });
        e.preventDefault();
      } else if (e.key === 'Enter' && highlighted >= 0) {
        handleSelect(pagedSuggestions[highlighted]);
        e.preventDefault();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setHighlighted(-1);
      }
    },
    [handleSelect, highlighted, isOpen, pagedSuggestions]
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
          className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow-md max-h-100 overflow-y-auto z-10"
        >
          {pagedSuggestions.map((s, i) => (
            <div
              key={s}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
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
          <div className="flex justify-between items-center px-2 py-1 bg-gray-50 border-t">
            <button
              disabled={page === 0}
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setHighlighted(-1);
                setPage((p) => Math.max(0, p - 1));
              }}
              className="px-2 py-1 text-sm bg-blue-500 hover:bg-blue-200 border rounded disabled:opacity-50"
            >
              이전
            </button>
            <span className="text-xs text-gray-500">
              {page + 1} / {Math.ceil(filteredSuggestions.length / maxResults)}
            </span>
            <button
              disabled={(page + 1) * maxResults >= filteredSuggestions.length}
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setHighlighted(-1);
                if (page === 0) {
                  setPage(1);
                } else {
                  setPage((p) => p + 1);
                }
              }}
              className="px-2 py-1 text-sm bg-blue-500 hover:bg-blue-200 border rounded disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
