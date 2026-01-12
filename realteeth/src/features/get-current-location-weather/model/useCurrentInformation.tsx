import { useEffect, useState } from 'react';
import useGeolocation from '../../control-current-location/model/useGeolocation';
import { useQuery } from '@tanstack/react-query';
import type { AddressResponse } from '../../../entities/geocode/modal/type';
import { getAdressQuery } from '../../../entities/geocode/query/query';
import { generateAdressParameter } from '../../../entities/geocode/api/api';
import type { MeteoResponse } from '../../../entities/weather/model/type';
import { getWeatherQuery } from '../../../entities/weather/query';
import { generateWeatherParameter } from '../../../entities/weather/api/api';
import {
  generateEmptyWeatherUiData,
  type WeatherUiData,
} from '../../../pages/weather/weather.type';
import { CurrentLocationError } from '../../../entities/error/model/error';

function useCurrentInformation(setUiData: (data: WeatherUiData) => void) {
  const [currentPosition, setCurrentPosition] = useState<{ latitude: number; longitude: number }>();
  const { getCurrentPosition } = useGeolocation();
  useEffect(() => {
    getCurrentPosition()
      .then((pos) => {
        setCurrentPosition({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      })
      .catch(() => {
        setUiData({
          ...generateEmptyWeatherUiData(),
          error: new CurrentLocationError(),
        });
      });
  }, [getCurrentPosition, setUiData]);
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
        error: undefined,
      });
    }
  }, [addressData, weatherData, setUiData, currentPosition]);
}
export default useCurrentInformation;
