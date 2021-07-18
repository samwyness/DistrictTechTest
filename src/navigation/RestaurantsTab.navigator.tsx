import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { screens } from '../config/navigation';

const Stack = createStackNavigator();

const RestaurantsTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.Restaurants.name}
        component={screens.Restaurants.component}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RestaurantsTab;
