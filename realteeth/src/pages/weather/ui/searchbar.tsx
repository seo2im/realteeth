import { Autocomplete } from '@shared/ui/audocomplete/autocomplete';
import District from '@shared/public/korea_districts.json';
import { useState } from 'react';
import { useDebounce } from '@shared/utils';

export function Searchbar({ setAddress }: { setAddress: (address: string) => void }) {
  const [, setInputValue] = useState<string>('');
  const debouncedSetAddress = useDebounce(
    (...args: unknown[]) => setAddress(args[0] as string),
    300
  );

  return (
    <div>
      <Autocomplete
        data={District}
        onSelect={setInputValue}
        onSearch={debouncedSetAddress}
        withSearchButton
        searchButtonLabel="검색"
      />
    </div>
  );
}
