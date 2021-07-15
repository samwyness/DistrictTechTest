import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { defaultMapStyle, darkMapStyle } from '../../config/googleMapsConfig';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useThemeSettings } from '../../hooks/useThemeSettings';
import MapMarker from '../MapMarker';
import { styles } from './RestaurantMap.style';
import { Restaurant } from '../../models/Restaurant';

type RestaurantMapProps = {
  restaurants: Restaurant[];
};

const RestaurantMap: React.FC<RestaurantMapProps> = ({ restaurants }) => {
  const { currentLocation } = useCurrentLocation();
  const [mapRegion, setMapRegion] = useState<Region>();

  const googleMapsStyle = useThemeSettings().isDarkMode
    ? darkMapStyle
    : defaultMapStyle;

  const handleOnRegionChangeComplete = useCallback((region: Region) => {
    setMapRegion(region);
  }, []);

  // Set map region to current location
  useEffect(() => {
    !mapRegion &&
      currentLocation &&
      setMapRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.015, // TODO: calculate values based on viewport
        longitudeDelta: 0.0121, // TODO: calculate values based on viewport
      });
  }, [currentLocation, mapRegion]);

  return (
    <View style={styles.container}>
      {mapRegion && (
        <MapView
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
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

export default RestaurantMap;
