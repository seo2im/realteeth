import { useCallback } from 'react';
function useGeolocation() {
  const getCurrentPosition = useCallback((): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  }, []);

  const watchPosition = useCallback(
    (
      successCallback: PositionCallback,
      errorCallback?: PositionErrorCallback,
      options?: PositionOptions
    ): number => {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser.');
      }
      return navigator.geolocation.watchPosition(successCallback, errorCallback, options);
    },
    []
  );

  const clearWatch = useCallback((watchId: number): void => {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return {
    getCurrentPosition,
    watchPosition,
    clearWatch,
  };
}
export default useGeolocation;
