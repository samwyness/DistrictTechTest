import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'native-base';

const ListTabStack = createStackNavigator();

const ListNavigator = () => {
  return (
    <ListTabStack.Navigator>
      <ListTabStack.Screen
        name="ListScreen"
        component={View}
        options={{ headerTitle: 'List Screen Title' }}
      />
    </ListTabStack.Navigator>
  );
};

export default ListNavigator;
