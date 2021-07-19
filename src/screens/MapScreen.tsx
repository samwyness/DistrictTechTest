import React from 'react';
import { View } from 'native-base';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useThemeSettings } from '../hooks/useThemeSettings';
import { useRestaurants } from '../hooks/useRestaurants';
import { AppBottomBarParamList } from '../navigation/AppBarBottom.navigator';
import RestaurantMap from '../components/RestaurantMap';

export type MapScreenNavigationProp = StackNavigationProp<
  AppBottomBarParamList,
  'Map'
>;

export type MapScreenProps = {
  route: RouteProp<AppBottomBarParamList, 'Map'>;
  navigation: MapScreenNavigationProp;
};

const MapScreen: React.FC<MapScreenProps> = ({ route }) => {
  const themeSettings = useThemeSettings();
  const { restaurants } = useRestaurants();

  return (
    <View flex={1} backgroundColor={themeSettings.backgroundColor}>
      <RestaurantMap
        restaurants={restaurants}
        restaurantId={route.params.restaurantId}
      />
    </View>
  );
};

export default MapScreen;
