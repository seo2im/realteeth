import { useState } from 'react';
import { Autocomplete } from '../../shared/ui/audocomplete/autocomplete';
import District from '../../shared/public/korea_districts.json';
import useCurrentInformation from '../../features/get-current-location-weather/useCurrentInformation';
import useInformation from '../../features/get-location-weather/useInformation';
import type { WeatherUiData } from './weather.type';
import { useSaveFavoriteLocation } from '../../features/control-favorite/useSaveFavoriteLoaction';
import FavoriteLocationCard from '../../widgets/ui/favoriteLocationCard';

function WeatherPage() {
  const [uiData, setUiData] = useState<WeatherUiData | undefined>(undefined);
  useCurrentInformation(setUiData);
  const { setAddress, geoRefetch } = useInformation(setUiData);
  const { favorites, saveFavorite } = useSaveFavoriteLocation();

  return (
    <div>
      {favorites.map((location) => (
        <FavoriteLocationCard
          key={location.id}
          {...location}
          onClick={() => {
            geoRefetch();
          }}
        />
      ))}
      <button
        type="button"
        onClick={() =>
          saveFavorite({
            id: `${uiData?.geocode.latitude}-${uiData?.geocode.longitude}`,
            name: uiData?.address || 'Unnamed Location',
            address: uiData?.address || '',
            geocode: {
              latitude: uiData?.geocode.latitude || 0,
              longitude: uiData?.geocode.longitude || 0,
            },
            weather: {
              current: {
                temperature_2m: uiData?.weather.current.temperature_2m || 0,
              },
              daily: {
                temperature_2m_max: uiData?.weather.daily.temperature_2m_max || [],
                temperature_2m_min: uiData?.weather.daily.temperature_2m_min || [],
              },
            },
          })
        }
      >
        저장
      </button>
      <Autocomplete data={District} onSelect={setAddress} />
      <button type="button" onClick={() => geoRefetch()}>
        Search
      </button>
      <div>
        {uiData ? (
          <div>
            <h2>Weather Information</h2>
            <h1>Location: {uiData.address}</h1>
            <p>Temperature: {uiData.weather.current.temperature_2m}°C</p>
            <p>Max Temperature: {uiData.weather.daily.temperature_2m_max[0]}°C</p>
            <p>Min Temperature: {uiData.weather.daily.temperature_2m_min[0]}°C</p>
            <p>Hourly Temperture:</p>
            <ul>
              {uiData.weather.hourly.time.map((time, index) => (
                <li key={time}>
                  {time}: {uiData.weather.hourly.temperature_2m[index]}°C
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default WeatherPage;
