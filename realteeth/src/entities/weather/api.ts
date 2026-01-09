import { getQueryString } from '../../shared/url';
import type { MetroParameters } from './type';

export const getWeather = async (params: MetroParameters) => {
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
};
