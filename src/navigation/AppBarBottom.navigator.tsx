import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppBarBottom from './AppBarBottom.component';
import RestaurantsScreen from '../screens/RestaurantsScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import MapScreen from '../screens/MapScreen';

export type AppBottomBarParamList = {
  Restaurants: undefined;
  RestaurantDetail: {
    restaurantId: string;
  };
  Map: {
    restaurantId: string | null;
  };
};

const BottomTabNavigator = createBottomTabNavigator<AppBottomBarParamList>();

const AppBarBottomNavigator = () => {
  return (
    <BottomTabNavigator.Navigator
      tabBar={props => <AppBarBottom {...props} />}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}>
      <BottomTabNavigator.Screen
        name="Restaurants"
        component={RestaurantsScreen}
      />
      <BottomTabNavigator.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />

      <BottomTabNavigator.Screen
        name="Map"
        initialParams={{
          restaurantId: null,
        }}
        component={MapScreen}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default AppBarBottomNavigator;
