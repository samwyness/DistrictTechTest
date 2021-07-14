import React, { useEffect, useState } from 'react';
import { Box, Center, View } from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { defaultMapStyle, darkMapStyle } from '../../config/googleMapsConfig';
import { useRestaurants } from '../../hooks/useRestaurants';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { styles } from './RestaurantMap.style';
import { useThemeSettings } from '../../hooks/useThemeSettings';

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
          customMapStyle={googleMapsStyle}>
          {restaurants.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.marker.latitude,
                longitude: marker.marker.longitude,
              }}
              title={marker.name}>
              <Center>
                <Box
                  width={8}
                  height={8}
                  backgroundColor="brand.opaque"
                  borderRadius="full">
                  <Box
                    pos="absolute"
                    top={1}
                    left={1}
                    width={6}
                    height={6}
                    backgroundColor="brand.opaque"
                    borderRadius="full"
                  />
                </Box>
              </Center>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

export default RestaurantMap;
