import { FRESH_WINDOW } from '../../shared/constant';
import { getWeather } from './api/api';
import type { MetroParameters } from './model/type';

export function getWeatherQuery(params: MetroParameters) {
  return {
    queryKey: ['weather', params.latitude, params.longitude, params.start_date],
    queryFn: async () => getWeather(params),
    staleTime: FRESH_WINDOW,
  };
}
