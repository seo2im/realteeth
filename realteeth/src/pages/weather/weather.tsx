import { useState } from 'react';

import type { WeatherUiData } from '@entities/uiData';
import { useSaveFavoriteLocation } from '@features/favorite-management';
import { Searchbar, DailyWeather, MainWeather, Favorites } from './ui';
import { useCurrentInformation } from '@features/weather-by-current';
import { useInformation } from '@features/weather-by-location';

export function WeatherPage() {
  const [uiData, setUiData] = useState<WeatherUiData | undefined>(undefined);
  useCurrentInformation(setUiData);
  const { setAddress, isLoading } = useInformation(setUiData);
  const { favorites, saveFavorite, deleteFavorite, patchFavorite } = useSaveFavoriteLocation();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 via-blue-500 to-blue-600 p-4 md:p-6 lg:p-8 min-w-screen">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <Searchbar setAddress={setAddress} />
        <MainWeather
          weather={uiData?.weather}
          address={uiData?.address}
          geocode={uiData?.geocode}
          error={uiData?.error}
          saveFavorite={saveFavorite}
          isLoading={isLoading}
        />
        <DailyWeather weather={uiData?.weather} />
        <Favorites
          favorites={favorites}
          deleteFavorite={deleteFavorite}
          patchFavorite={patchFavorite}
          setAddress={setAddress}
        />
      </div>
    </div>
  );
}
