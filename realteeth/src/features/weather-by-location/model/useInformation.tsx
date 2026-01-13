/* eslint-disable react-hooks/set-state-in-effect */
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import type { GeoResponse } from '@entities/geocode';
import { generateGeoParamter, getGeocodeQuery } from '@entities/geocode';
import { getWeatherQuery, generateWeatherParameter } from '@entities/weather';
import { generateEmptyWeatherUiData, type WeatherUiData } from '@entities/uiData';
import { GeocodeError, WeatherDataError } from '@entities/error';

export function useInformation(setUiData: (data: WeatherUiData) => void) {
  const [address, setAddress] = useState<string>('');
  const [refineName, setRefineName] = useState<string>('');
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
        name: refineName || address,
        address: geocodeData.response.refined.text,
        geocode: {
          latitude: parseFloat(geocodeData.response.result.point.y),
          longitude: parseFloat(geocodeData.response.result.point.x),
        },
        weather: weatherData,
      });
    }
  }, [geocodeData, weatherData, setUiData, refineName, address]);
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
  const onSearch = useCallback(
    function (address: string, name: string) {
      setAddress(address);
      setRefineName(name);
    },
    [setAddress, setRefineName]
  );

  return {
    geoRefetch,
    isLoading,
    onSearch,
  };
}
