import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { AddressResponse } from '@entities/geocode';
import { getAdressQuery, generateAdressParameter } from '@entities/geocode';
import type { MeteoResponse } from '@entities/weather';
import { getWeatherQuery, generateWeatherParameter } from '@entities/weather';
import { generateEmptyWeatherUiData, type WeatherUiData } from '@entities/uiData';
import { CurrentLocationError } from '@entities/error';
import { useGeolocation } from '@features/geolocation-access';

export function useCurrentInformation(setUiData: (data: WeatherUiData) => void) {
  const [currentPosition, setCurrentPosition] = useState<{ latitude: number; longitude: number }>();
  const { getCurrentPosition } = useGeolocation();
  useEffect(() => {
    getCurrentPosition()
      .then((pos: GeolocationPosition) => {
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
        name: addressData.response.result[0].text,
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
