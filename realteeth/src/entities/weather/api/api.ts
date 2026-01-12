import { getQueryString } from '@shared/utils/url';
import { CURRENT_OPTIONS, DAILY_OPTIONS, HOURLY_OPTIONS } from '@entities/weather/constant';
import type { MetroParameters } from '@entities/weather/model/type';

export async function getWeather(params: MetroParameters) {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast${getQueryString(params)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}
export function generateWeatherParameter(options: {
  latitude: number;
  longitude: number;
}): MetroParameters {
  return {
    latitude: options.latitude,
    longitude: options.longitude,
    hourly: HOURLY_OPTIONS.join(','),
    daily: DAILY_OPTIONS.join(','),
    current: CURRENT_OPTIONS.join(','),
    timezone: 'auto',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
  };
}
