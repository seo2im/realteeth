import { useEffect } from 'react';
import type { FavoriteLocation } from '../../entities/favorite/model/type';
import { useQuery } from '@tanstack/react-query';
import { getWeatherQuery } from '../../entities/weather/query';
import { generateWeatherParameter } from '../../entities/weather/api/api';
import type { MeteoResponse } from '../../entities/weather/model/type';

type FavoriteLocationProps = FavoriteLocation & {
  onClick?: (id: string) => void;
  onDelete?: (id: string) => void;
  setFavoriteLocations?: (
    locations: FavoriteLocation[] | ((prev: FavoriteLocation[]) => FavoriteLocation[])
  ) => void;
};
function FavoriteLocationCard({
  id,
  name,
  address,
  geocode,
  weather,
  setFavoriteLocations,
  onClick,
  onDelete,
}: FavoriteLocationProps) {
  const { data } = useQuery<MeteoResponse>({
    ...getWeatherQuery(
      generateWeatherParameter({
        latitude: geocode.latitude,
        longitude: geocode.longitude,
      })
    ),
  });
  useEffect(() => {
    if (data && setFavoriteLocations) {
      setFavoriteLocations((prev: FavoriteLocation[]) =>
        prev.map((location) =>
          location.id === id
            ? {
                ...location,
                weather: {
                  current: {
                    temperature_2m: data.current.temperature_2m,
                  },
                  daily: {
                    temperature_2m_max: data.daily.temperature_2m_max,
                    temperature_2m_min: data.daily.temperature_2m_min,
                  },
                },
              }
            : location
        )
      );
    }
  }, [data, id, setFavoriteLocations]);

  return (
    <div className="border p-4 mb-2 rounded shadow-sm">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{address}</p>
      <div className="mt-2">
        <p className="text-sm">Temperature: {weather.current.temperature_2m}°C</p>
      </div>
      <div className="mt-2">
        <p className="text-sm">Max Temperature: {weather.daily.temperature_2m_max[0]}°C</p>
      </div>
      <div className="mt-2">
        <p className="text-sm">Min Temperature: {weather.daily.temperature_2m_min[0]}°C</p>
      </div>
      <div className="mt-4 flex space-x-2">
        {onClick && (
          <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => onClick(id)}>
            Select
          </button>
        )}
        {onDelete && (
          <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => onDelete(id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
export default FavoriteLocationCard;
