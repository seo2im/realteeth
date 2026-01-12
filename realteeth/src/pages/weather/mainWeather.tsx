import type { FavoriteLocation } from '../../entities/favorite/model/type';
import { Alert } from '../../shared/ui/alert/alert';
import { Snackbar } from '../../shared/ui/snackbar/snackbar';
import { Spinner } from '../../shared/ui/spinner/spinner';
import useSnackbarStore, { SnackbarIDs } from '../../widgets/model/snackbarStore';
import type { WeatherUiData } from './weather.type';

export function MainWeather({
  weather,
  address,
  geocode,
  error,
  saveFavorite,
}: {
  weather?: WeatherUiData['weather'];
  address?: string;
  geocode?: WeatherUiData['geocode'];
  error?: WeatherUiData['error'];
  saveFavorite?: (favorite: FavoriteLocation) => void;
}) {
  const snackbarId = useSnackbarStore((state) => state.id);
  const open = useSnackbarStore((state) => state.open);
  const close = useSnackbarStore((state) => state.close);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl">
      {!weather ? (
        <div className="h-75 flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-75">
          <Alert type="danger" message={error.message} />
        </div>
      ) : (
        <div className="flex flex-col items-center text-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-lg md:text-xl">{address}</span>
          </div>
          <button
            onClick={() => {
              if (saveFavorite) {
                saveFavorite({
                  id: `${weather?.current.temperature_2m}-${weather?.daily.temperature_2m_max[0]}-${weather?.daily.temperature_2m_min[0]}`,
                  name: address || 'Unnamed Location',
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
                open(SnackbarIDs.FAVORITE_SAVED);
              }
            }}
            className="ml-2 p-1.5 md:p-2 rounded-full hover:bg-white/10 transition-all"
            aria-label="즐겨찾기"
          >
            즐겨찾기 추가
          </button>
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
      {snackbarId === SnackbarIDs.FAVORITE_SAVED && (
        <Snackbar
          message={<Alert type="success" message="즐겨찾기에 추가되었습니다!" />}
          onClose={close}
          duration={3000}
          snackbarPosition="bottom"
        />
      )}
    </div>
  );
}
