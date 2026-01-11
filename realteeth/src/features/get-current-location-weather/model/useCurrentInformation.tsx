import { useEffect, useState } from 'react';
import useGeolocation from '../../control-current-location/mode;l/useGeolocation';
import { useQuery } from '@tanstack/react-query';
import type { AddressResponse } from '../../../entities/geocode/modal/type';
import { getAdressQuery } from '../../../entities/geocode/query/query';
import { generateAdressParameter } from '../../../entities/geocode/api/api';
import type { MeteoResponse } from '../../../entities/weather/model/type';
import { getWeatherQuery } from '../../../entities/weather/query';
import { generateWeatherParameter } from '../../../entities/weather/api/api';
import type { WeatherUiData } from '../../../pages/weather/weather.type';

function useCurrentInformation(setUiData: (data: WeatherUiData) => void) {
  const [currentPosition, setCurrentPosition] = useState<{ latitude: number; longitude: number }>();
  const { getCurrentPosition } = useGeolocation();
  useEffect(() => {
    getCurrentPosition().then((pos) => {
      setCurrentPosition({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    });
  }, [getCurrentPosition]);
  const { data: addressData } = useQuery<AddressResponse>({
    ...getAdressQuery(
      generateAdressParameter({
        latitude: currentPosition?.latitude || 0,
        longitude: currentPosition?.longitude || 0,
      })
    ),
    enabled: !!currentPosition,
  });
  const { data: weatherData } = useQuery<MeteoResponse>({
    ...getWeatherQuery(
      generateWeatherParameter({
        latitude: currentPosition?.latitude || 0,
        longitude: currentPosition?.longitude || 0,
      })
    ),
    enabled: !!currentPosition,
  });

  useEffect(() => {
    if (addressData && weatherData) {
      setUiData({
        address: addressData.response.result[0].text,
        geocode: {
          latitude: currentPosition?.latitude || 0,
          longitude: currentPosition?.longitude || 0,
        },
        weather: weatherData,
      });
    }
  }, [addressData, weatherData, setUiData, currentPosition]);
}
export default useCurrentInformation;
