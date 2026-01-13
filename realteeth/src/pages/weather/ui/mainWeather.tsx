import type { FavoriteLocation } from '@entities/favorite';
import { Spinner } from '@shared/ui';
import type { WeatherUiData } from '@entities/uiData/model/weather.type';
import { useDebounce } from '@shared/utils';

export function MainWeather({
  name,
  weather,
  address,
  geocode,
  error,
  saveFavorite,
  isLoading,
}: {
  name?: string;
  weather?: WeatherUiData['weather'];
  address?: string;
  geocode?: WeatherUiData['geocode'];
  error?: WeatherUiData['error'];
  saveFavorite: (favorite: FavoriteLocation) => void;
  isLoading: boolean;
}) {
  const addFavorite = useDebounce(() => {
    saveFavorite({
      id: `${geocode?.latitude}-${geocode?.longitude}`,
      name: name || address || 'Unnamed Location',
      address: address || '',
      geocode: {
        latitude: geocode?.latitude || 0,
        longitude: geocode?.longitude || 0,
      },
      weather: {
        current: {
          temperature_2m: weather?.current.temperature_2m || 0,
        },
        daily: {
          temperature_2m_max: weather?.daily.temperature_2m_max || [],
          temperature_2m_min: weather?.daily.temperature_2m_min || [],
        },
      },
    });
  }, 300);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl">
      {!weather || isLoading ? (
        <div className="h-75 flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-75">{error.message}</div>
      ) : (
        <div className="flex flex-col items-center text-center gap-4 md:gap-6">
          <button
            onClick={addFavorite}
            className="ml-2 px-4 py-1.5 rounded-full hover:bg-white/10 transition-all bg-blue-500"
            aria-label="즐겨찾기"
          >
            즐겨찾기 추가
          </button>
          <div className="flex flex-col md:flex-row items-center gap-2 text-white/90">
            <span className="text-lg md:text-xl">{name}</span>
            <span className="text-sm md:text-base">({address})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-7xl md:text-8xl lg:text-9xl font-light">
              {weather?.current.temperature_2m}°
            </span>
            <span className="text-xl md:text-2xl mb-3 md:mb-4">C</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4 text-white/80">
            <span className="text-base md:text-lg">최저 {weather?.daily.temperature_2m_min}°</span>
            <span className="text-base md:text-lg">최고 {weather?.daily.temperature_2m_max}°</span>
          </div>
        </div>
      )}
    </div>
  );
}
