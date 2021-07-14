import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import { useThemeSettings } from '../hooks/useThemeSettings';
import AppBarBottomNavigator from './AppBarBottom.navigator';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  const themeSettings = useThemeSettings();

  return (
    <NavigationContainer
      theme={themeSettings.isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={AppBarBottomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
