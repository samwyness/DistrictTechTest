import React, { useCallback, useRef, useState } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { screens } from '../config/navigation';
import { useThemeSettings } from '../hooks/useThemeSettings';
import AppBarBottomNavigator from './AppBarBottom.navigator';

export type RootStackParamList = {
  Root: undefined;
  RestaurantDetailScreen: {
    restaurantId: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  const themeSettings = useThemeSettings();
  const navigationRef = useRef<NavigationContainerRef>(null);
  const [currentRouteName, setCurrentRouteName] = useState<string>();

  const updateRouteName = useCallback(() => {
    const routeName = navigationRef.current?.getCurrentRoute()?.name;
    if (routeName) {
      console.log('DEBUG: Navigation', routeName);
      setCurrentRouteName(routeName);
    }
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={themeSettings.isDarkMode ? DarkTheme : DefaultTheme}
      onReady={updateRouteName}
      onStateChange={updateRouteName}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={AppBarBottomNavigator} />
        <Stack.Screen
          name={screens.RestaurantDetail.name as 'RestaurantDetailScreen'}
          component={screens.RestaurantDetail.component}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
