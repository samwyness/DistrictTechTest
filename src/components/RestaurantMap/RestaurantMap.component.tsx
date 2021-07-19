import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, View } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { defaultMapStyle, darkMapStyle } from '../../config/googleMapsConfig';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useThemeSettings } from '../../hooks/useThemeSettings';
import MapMarker from '../MapMarker';
import { styles } from './RestaurantMap.style';
import { Restaurant } from '../../models/Restaurant';
import { useRef } from 'react';

type RestaurantMapProps = {
  restaurants: Restaurant[];
  restaurantId: string | null;
};

const RestaurantMap: React.FC<RestaurantMapProps> = ({
  restaurants,
  restaurantId,
}) => {
  const map = useRef<MapView>(null);
  const { currentLocation } = useCurrentLocation();
  const [mapRegion, setMapRegion] = useState<Region>();
  const [focusPlace, setFocusPlace] = useState<Restaurant | null>(null);
  const [showMapRefresh, setShowMapRefresh] = useState(false);

  const googleMapsStyle = useThemeSettings().isDarkMode
    ? darkMapStyle
    : defaultMapStyle;

  const handleOnRegionChangeComplete = useCallback((region: Region) => {
    setMapRegion(region);
    setFocusPlace(null);
  }, []);

  const handleOnPressRefreshMap = useCallback(() => {
    setShowMapRefresh(false);
  }, []);

  // Set map region to current location
  useEffect(() => {
    if (!mapRegion && currentLocation) {
      setMapRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.015, // TODO: calculate values based on viewport
        longitudeDelta: 0.0121, // TODO: calculate values based on viewport
      });
    }
  }, [currentLocation, mapRegion]);

  // Update focusPlace when restaurantId props changes
  useEffect(() => {
    if (restaurantId) {
      const tempPlace =
        restaurants.find(item => item.id === restaurantId) || null;
      tempPlace && setFocusPlace(tempPlace);
    }
  }, [restaurantId, restaurants]);

  // Animate to focusPlace marker
  // Note: Stop clashes with 'setMapRegion' by checking for 'MapRegion' first
  useEffect(() => {
    if (focusPlace) {
      const newRegion: Region = {
        latitude: focusPlace.marker.latitude,
        longitude: focusPlace.marker.longitude,
        latitudeDelta: 0.015, // TODO: calculate values based on viewport
        longitudeDelta: 0.0121, // TODO: calculate values based on viewport
      };

      mapRegion
        ? map.current?.animateToRegion(newRegion)
        : setMapRegion(newRegion);
    }
  }, [focusPlace, mapRegion]);

  return (
    <View style={styles.container}>
      {!focusPlace && showMapRefresh && (
        <Box
          flex={1}
          justifyContent="center"
          position="absolute"
          top={4}
          zIndex={10}>
          <Button size="sm" shadow={4} onPress={handleOnPressRefreshMap}>
            Search this area
          </Button>
        </Box>
      )}

      {mapRegion && (
        <MapView
          ref={map}
          loadingEnabled
          provider={PROVIDER_GOOGLE} // Required for Google Maps
          style={styles.map}
          initialRegion={mapRegion}
          region={mapRegion}
          customMapStyle={googleMapsStyle}
          onRegionChangeComplete={handleOnRegionChangeComplete}>
          {restaurants.map((item, index) => (
            <MapMarker
              key={index}
              coordinates={{
                latitude: item.marker.latitude,
                longitude: item.marker.longitude,
              }}
              title={item.name}
              restaurantId={item.id}
              isFocused={item.id === focusPlace?.id}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

export default RestaurantMap;
