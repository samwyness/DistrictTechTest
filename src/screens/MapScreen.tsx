import React from 'react';
import { View } from 'native-base';

import { useThemeSettings } from '../hooks/useThemeSettings';
import { useRestaurants } from '../hooks/useRestaurants';
import RestaurantMap from '../components/RestaurantMap';

const MapScreen = () => {
  const themeSettings = useThemeSettings();
  const { restaurants } = useRestaurants();

  return (
    <View flex={1} backgroundColor={themeSettings.backgroundColor}>
      <RestaurantMap restaurants={restaurants} />
    </View>
  );
};

export default MapScreen;
