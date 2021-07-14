import React from 'react';
import { View } from 'native-base';

import { useThemeSettings } from '../hooks/useThemeSettings';

const MapScreen = () => {
  const themeSettings = useThemeSettings();

  return <View flex={1} backgroundColor={themeSettings.backgroundColor} />;
};

export default MapScreen;
