import React from 'react';

import RestaurantsScreen from '../screens/RestaurantsScreen';
import MapScreen from '../screens/MapScreen';

import MapTab from './MapTab.navigator';
import RestaurantsTab from './RestaurantsTab.navigator';

// Screens
//-----------------
export const screens = {
  Restaurants: {
    name: 'RestaurantsScreen',
    component: RestaurantsScreen,
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
    icon: 'whatshot',
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
