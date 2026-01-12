import type { WeatherError } from '../../entities/error/model/error';

export type WeatherUiData = {
  address: string;
  geocode: {
    latitude: number;
    longitude: number;
  };
  weather: {
    current: {
      temperature_2m: number;
    };
    daily: {
      temperature_2m_max: number[];
      temperature_2m_min: number[];
    };
    hourly: {
      time: string[];
      temperature_2m: number[];
    };
  };
  error?: WeatherError;
};
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
