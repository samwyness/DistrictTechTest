import React from 'react';
import { View } from 'native-base';

import { useThemeSettings } from '../hooks/useThemeSettings';
import RestaurantMap from '../components/RestaurantMap';

const MapScreen = () => {
  const themeSettings = useThemeSettings();

  return (
    <View flex={1} backgroundColor={themeSettings.backgroundColor}>
      <RestaurantMap />
    </View>
  );
};

export default MapScreen;
