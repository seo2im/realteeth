export type GeoParameters = {
  service: 'address';
  request: 'getcoord';
  version: '2.0';
  crs: 'epsg:4326';
  address: string;
  refine: boolean;
  simple: boolean;
  format: 'json';
  type: 'road' | 'parcel';
  key: string;
};
export type AddressParameters = {
  service: 'address';
  request: 'getAddress';
  version: '2.0';
  crs: 'epsg:4326';
  point: string;
  type: 'parcel';
  simple: boolean;
  format: 'json';
  key: string;
};
export type GeoResponse = {
  response: {
    service: {
      name: string;
      version: string;
      operation: string;
      time: string;
    };
    status: string;
    input: {
      type: string;
      address: string;
    };
    refined: {
      text: string;
      structure: {
        level0: string;
        level1: string;
        level2: string;
        level3: string;
        level4L: string;
        level4LC: string;
        level4A: string;
        level4AC: string;
        level5: string;
        detail: string;
      };
    };
    result: {
      crs: string;
      point: {
        x: string;
        y: string;
      };
    };
  };
};
export type AddressResponse = {
  response: {
    service: {
      name: string;
      version: string;
      operation: string;
      time: string;
    };
    status: string;
    input: {
      crs: string;
      type: string;
      point: {
        x: string;
        y: string;
      };
    };
    result: {
      zipcode: string;
      type: string;
      text: string;
      structure: {
        level0: string;
        level1: string;
        level2: string;
        level3: string;
        level4L: string;
        level4LC: string;
        level4A: string;
        level4AC: string;
        level5: string;
        detail: string;
      };
    }[];
  };
};
