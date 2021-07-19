import RestaurantsScreen from '../screens/RestaurantsScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import MapScreen from '../screens/MapScreen';

// Screens
//-----------------
export const screens = {
  Restaurants: {
    name: 'Restaurants',
    component: RestaurantsScreen,
  },
  RestaurantDetail: {
    name: 'RestaurantDetail',
    component: RestaurantDetailScreen,
  },
  Map: {
    name: 'Map',
    component: MapScreen,
  },
};

// Tabs
//-----------------
export type TabConfig = {
  name: string;
  label: string;
  icon: string;
};

export const bottomTabs: TabConfig[] = [
  {
    name: 'Restaurants',
    label: 'Restaurants',
    icon: 'restaurant',
  },
  {
    name: 'Map',
    label: 'View Map',
    icon: 'place',
  },
];

export const findTabByName = (tabs: TabConfig[], name: string) =>
  tabs.find(tab => tab.name === name);
