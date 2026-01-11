import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { GeoResponse } from '../../entities/geocode/modal/type';
import { generateGeoParamter } from '../../entities/geocode/api/api';
import { getGeocodeQuery } from '../../entities/geocode/query/query';
import { getWeatherQuery } from '../../entities/weather/query';
import { generateWeatherParameter } from '../../entities/weather/api/api';
import type { WeatherUiData } from '../../pages/weather/weather.type';

function useInformation(setUiData: (data: WeatherUiData) => void) {
  const [address, setAddress] = useState<string>('');
  const { data: geocodeData, refetch: geoRefetch } = useQuery<GeoResponse>({
    ...getGeocodeQuery(
      generateGeoParamter({
        address: address,
      })
    ),
    enabled: false,
  });
  const { data: weatherData } = useQuery({
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

  return {
    geoRefetch,
    setAddress,
  };
}
export default useInformation;
