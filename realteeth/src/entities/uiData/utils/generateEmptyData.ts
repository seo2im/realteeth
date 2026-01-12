import type { WeatherUiData } from '@entities/uiData';

export function generateEmptyWeatherUiData(): WeatherUiData {
  return {
    address: '',
    geocode: {
      latitude: 0,
      longitude: 0,
    },
    weather: {
      current: {
        temperature_2m: 0,
      },
      daily: {
        temperature_2m_max: [],
        temperature_2m_min: [],
      },
      hourly: {
        time: [],
        temperature_2m: [],
      },
    },
  };
}
