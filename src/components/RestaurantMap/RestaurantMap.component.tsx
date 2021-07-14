import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { defaultMapStyle, darkMapStyle } from '../../config/googleMapsConfig';
import { useRestaurants } from '../../hooks/useRestaurants';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useThemeSettings } from '../../hooks/useThemeSettings';
import MapMarker from '../MapMarker';
import { styles } from './RestaurantMap.style';

const RestaurantMap = () => {
  const { currentLocation } = useCurrentLocation();
  const { restaurants, getNearbyRestaurants } = useRestaurants();
  const [mapRegion, setMapRegion] = useState<Region>();
  const googleMapsStyle = useThemeSettings().isDarkMode
    ? darkMapStyle
    : defaultMapStyle;

  // Set map region to current location
  useEffect(() => {
    !mapRegion &&
      currentLocation &&
      setMapRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
  }, [currentLocation, mapRegion]);

  // Fetch nearby places once we have region data
  useEffect(() => {
    if (restaurants.length === 0 && mapRegion) {
      getNearbyRestaurants(mapRegion.latitude, mapRegion.longitude);
    }
  }, [getNearbyRestaurants, mapRegion, restaurants.length]);

  return (
    <View style={styles.container}>
      {mapRegion && (
        <MapView
          provider={PROVIDER_GOOGLE} // Required for Google Maps
          style={styles.map}
          region={mapRegion}
          {restaurants.map((item, index) => (
            <MapMarker
              key={index}
              coordinates={{
                latitude: item.marker.latitude,
                longitude: item.marker.longitude,
              }}
              title={item.name}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

export default RestaurantMap;
