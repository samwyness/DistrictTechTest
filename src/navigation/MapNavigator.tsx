import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'native-base';

const MapTabStack = createStackNavigator();

const MapNavigator = () => {
  return (
    <MapTabStack.Navigator>
      <MapTabStack.Screen
        name="MapScreen"
        component={View}
        options={{ headerTitle: 'Map Screen Title' }}
      />
    </MapTabStack.Navigator>
  );
};

export default MapNavigator;
