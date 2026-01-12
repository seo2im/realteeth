import { FRESH_WINDOW } from '@shared/constant';
import { getWeather } from '@entities/weather/api/api';
import type { MetroParameters } from '@entities/weather/model/type';

export function getWeatherQuery(params: MetroParameters) {
  return {
    queryKey: ['weather', params.latitude, params.longitude, params.start_date],
    queryFn: async () => getWeather(params),
    staleTime: FRESH_WINDOW,
  };
}
