import { Autocomplete } from '../../shared/ui/audocomplete/autocomplete';
import District from '../../shared/public/korea_districts.json';
import { useState } from 'react';

function Searchbar({ setAddress }: { setAddress: (address: string) => void }) {
  const [, setInputValue] = useState<string>('');

  return (
    <div>
      <Autocomplete
        data={District}
        onSelect={setInputValue}
        onSearch={setAddress}
        withSearchButton
        searchButtonLabel="검색"
      />
    </div>
  );
}
export default Searchbar;
