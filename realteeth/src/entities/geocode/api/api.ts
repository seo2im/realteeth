import { getQueryString } from '@shared/utils/url';
import type { AddressParameters, GeoParameters } from '@entities/geocode/model/type';
import { VWORLD_API_BASE } from '@entities/geocode/constant';

export async function getGeo(params: GeoParameters) {
  const response = await fetch(`${VWORLD_API_BASE}${getQueryString(params)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  if (data.response.status !== 'OK') {
    throw new Error('Geocode API returned an error');
  }
  return data;
}
export async function getAddress(params: AddressParameters) {
  const response = await fetch(`${VWORLD_API_BASE}${getQueryString(params)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  if (data.response.status !== 'OK') {
    throw new Error('Geocode API returned an error');
  }
  return data;
}
export function generateGeoParamter({ address }: { address: string }): GeoParameters {
  return {
    service: 'address',
    request: 'getcoord',
    version: '2.0',
    address,
    key: import.meta.env.VITE_GEO_API_KEY,
    format: 'json',
    refine: true,
    simple: false,
    crs: 'epsg:4326',
    type: 'parcel',
  };
}
export function generateAdressParameter({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): AddressParameters {
  return {
    service: 'address',
    request: 'getAddress',
    version: '2.0',
    point: `${longitude},${latitude}`,
    key: import.meta.env.VITE_GEO_API_KEY,
    format: 'json',
    crs: 'epsg:4326',
    type: 'parcel',
    simple: false,
  };
}
