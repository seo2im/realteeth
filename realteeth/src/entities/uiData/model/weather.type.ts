import type { WeatherError } from '@entities/error';

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
