import { Autocomplete } from '@shared/ui/audocomplete/autocomplete';
import District from '@shared/public/korea_districts.json';
import { useState } from 'react';
import { useDebounce } from '@shared/utils';

export function Searchbar({ onSearch }: { onSearch: (address: string, name: string) => void }) {
  const [, setInputValue] = useState<string>('');
  const debouncedSetAddress = useDebounce(
    (...args: unknown[]) => onSearch(args[0] as string, args[1] as string),
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
        placeholder="지역명을 입력해주세요"
      />
    </div>
  );
}
