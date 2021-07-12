import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import MapNavigator from './MapNavigator';
import ListNavigator from './ListNavigator';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="List"
      tabBarOptions={{ keyboardHidesTabBar: true }}>
      <BottomTab.Screen
        name="List"
        component={ListNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="list" style={{ color }} />,
        }}
      />
      <BottomTab.Screen
        name="Map"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="map" style={{ color }} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
