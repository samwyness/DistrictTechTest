import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { screens } from '../config/navigation';

const Stack = createStackNavigator();

const MapTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.Map.name}
        component={screens.Map.component}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MapTab;
