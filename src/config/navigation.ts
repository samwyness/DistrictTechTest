import React from 'react';

import RestaurantsScreen from '../screens/RestaurantsScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import MapScreen from '../screens/MapScreen';

import MapTab from '../navigation/MapTab.navigator';
import RestaurantsTab from '../navigation/RestaurantsTab.navigator';

// Screens
//-----------------
export const screens = {
  Restaurants: {
    name: 'RestaurantsScreen',
    component: RestaurantsScreen,
  },
  RestaurantDetail: {
    name: 'RestaurantDetailScreen',
    component: RestaurantDetailScreen,
  },
  Map: {
    name: 'MapScreen',
    component: MapScreen,
  },
};

// Tabs
//-----------------
export type TabConfig = {
  name: string;
  label: string;
  icon: string;
  component: React.FC;
};

export const bottomTabs: TabConfig[] = [
  {
    name: 'Restaurants',
    label: 'Restaurants',
    icon: 'restaurant',
    component: RestaurantsTab,
  },
  {
    name: 'Map',
    label: 'View Map',
    icon: 'place',
    component: MapTab,
  },
];

export const findTabByName = (tabs: TabConfig[], name: string) =>
  tabs.find(tab => tab.name === name);
