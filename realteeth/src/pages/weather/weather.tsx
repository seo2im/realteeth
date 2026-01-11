import { useState } from 'react';
import useCurrentInformation from '../../features/get-current-location-weather/model/useCurrentInformation';
import useInformation from '../../features/get-location-weather/model/useInformation';
import type { WeatherUiData } from './weather.type';
import { useSaveFavoriteLocation } from '../../features/control-favorite/model/useSaveFavoriteLoaction';
import Searchbar from './searchbar';
import { DailyWeather } from './dailyWeather';
import { MainWeather } from './mainWeather';
import Favorites from './favorites';

function WeatherPage() {
  const [uiData, setUiData] = useState<WeatherUiData | undefined>(undefined);
  useCurrentInformation(setUiData);
  const { setAddress } = useInformation(setUiData);
  const { favorites, saveFavorite, deleteFavorite } = useSaveFavoriteLocation();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 via-blue-500 to-blue-600 p-4 md:p-6 lg:p-8 min-w-screen">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <Searchbar setAddress={setAddress} />
        <MainWeather
          weather={uiData?.weather}
          address={uiData?.address}
          geocode={uiData?.geocode}
          saveFavorite={saveFavorite}
        />
        <DailyWeather weather={uiData?.weather} />
        <Favorites
          favorites={favorites}
          deleteFavoriteLocation={deleteFavorite}
          setAddress={setAddress}
        />
      </div>
    </div>
  );
}

export default WeatherPage;
