import { useCallback, useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<LatLng>();

  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  // Determine current location on first render
  useEffect(() => {
    !currentLocation && getCurrentLocation();
  }, [currentLocation, getCurrentLocation]);

  return {
    currentLocation,
    getCurrentLocation,
  };
};
