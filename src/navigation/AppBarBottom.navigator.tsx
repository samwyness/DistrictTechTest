import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { bottomTabs } from './config';
import AppBarBottom from './AppBarBottom.component';

const BottomTabNavigator = createBottomTabNavigator();

const AppBarBottomNavigator = () => {
  return (
    <BottomTabNavigator.Navigator
      tabBar={props => <AppBarBottom {...props} />}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}>
      {bottomTabs.map((tab, index) => (
        <BottomTabNavigator.Screen
          key={index}
          name={tab.name}
          component={tab.component}
        />
      ))}
    </BottomTabNavigator.Navigator>
  );
};

export default AppBarBottomNavigator;
