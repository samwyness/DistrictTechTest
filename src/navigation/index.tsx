import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import { useThemeSettings } from '../hooks/useThemeSettings';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  const themeSettings = useThemeSettings();

  return (
    <NavigationContainer
      theme={themeSettings.isDarkMode ? DarkTheme : DefaultTheme}>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
