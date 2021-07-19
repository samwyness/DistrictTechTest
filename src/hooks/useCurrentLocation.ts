import { useCallback, useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import { LatLng } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export const useCurrentLocation = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LatLng>();

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      // console.log(
      //   `DEBUG: PERMISSIONS.ACCESS_FINE_LOCATION=${PermissionsAndroid.RESULTS.GRANTED}`,
      // );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasLocationPermission(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = useCallback(async () => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log(error);
      },
      // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  // Determine current location on first render
  useEffect(() => {
    if (hasLocationPermission && !currentLocation) {
      getCurrentLocation();
    } else {
      requestLocationPermission();
    }
  }, [currentLocation, getCurrentLocation, hasLocationPermission]);

  return {
    currentLocation,
    hasLocationPermission,
    getCurrentLocation,
  };
};
