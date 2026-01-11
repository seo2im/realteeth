import { FRESH_WINDOW } from '../../../shared/constant';
import { getAddress, getGeo } from '../api/api';
import type { AddressParameters, GeoParameters } from '../modal/type';

export function getGeocodeQuery(params: GeoParameters) {
  return {
    queryKey: ['geocode', params.address],
    queryFn: async () => getGeo(params),
    staleTime: FRESH_WINDOW,
  };
}
export function getAdressQuery(params: AddressParameters) {
  return {
    queryKey: ['address', params.point],
    queryFn: async () => getAddress(params),
    staleTime: FRESH_WINDOW,
  };
}
