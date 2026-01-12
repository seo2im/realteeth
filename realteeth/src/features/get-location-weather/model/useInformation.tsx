/* eslint-disable react-hooks/set-state-in-effect */
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { GeoResponse } from '../../../entities/geocode/modal/type';
import { generateGeoParamter } from '../../../entities/geocode/api/api';
import { getGeocodeQuery } from '../../../entities/geocode/query/query';
import { getWeatherQuery } from '../../../entities/weather/query';
import { generateWeatherParameter } from '../../../entities/weather/api/api';
import {
  generateEmptyWeatherUiData,
  type WeatherUiData,
} from '../../../pages/weather/weather.type';
import { GeocodeError, WeatherDataError } from '../../../entities/error/model/error';

function useInformation(setUiData: (data: WeatherUiData) => void) {
  const [address, setAddress] = useState<string>('');
  const {
    data: geocodeData,
    refetch: geoRefetch,
    isError: geoError,
    isLoading: geoLoading,
  } = useQuery<GeoResponse>({
    ...getGeocodeQuery(
      generateGeoParamter({
        address: address,
      })
    ),
    enabled: !!address,
  });
  const {
    data: weatherData,
    isError: weatherError,
    isLoading: weatherLoading,
  } = useQuery({
    ...getWeatherQuery(
      generateWeatherParameter({
        latitude: geocodeData?.response.result.point.y
          ? parseFloat(geocodeData.response.result.point.y)
          : 0,
        longitude: geocodeData?.response.result.point.x
          ? parseFloat(geocodeData.response.result.point.x)
          : 0,
      })
    ),
    enabled: !!geocodeData,
  });

  useEffect(() => {
    if (geocodeData && weatherData) {
      setUiData({
        address: address,
        geocode: {
          latitude: parseFloat(geocodeData.response.result.point.y),
          longitude: parseFloat(geocodeData.response.result.point.x),
        },
        weather: weatherData,
      });
    }
  }, [geocodeData, weatherData, setUiData, address]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (geoLoading || weatherLoading) {
      setIsLoading(true);
      return;
    }
    if (geoLoading === false && weatherLoading === false && isLoading) {
      setTimeout(() => setIsLoading(geoLoading || weatherLoading), 300);
    }
  }, [geoLoading, weatherLoading, isLoading, setIsLoading]);
  useEffect(() => {
    if (geoError) {
      setUiData({
        ...generateEmptyWeatherUiData(),
        error: new GeocodeError(),
      });
    } else if (weatherError) {
      setUiData({
        ...generateEmptyWeatherUiData(),
        error: new WeatherDataError(),
      });
    }
  }, [geoError, weatherError, setUiData]);

  return {
    geoRefetch,
    setAddress,
    isLoading,
  };
}
export default useInformation;
