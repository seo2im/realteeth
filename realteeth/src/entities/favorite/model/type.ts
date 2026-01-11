export type FavoriteLocation = {
  id: string;
  name: string;
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
  };
};
