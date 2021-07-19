import React, { useCallback, useRef, useState } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationContainerRef,
} from '@react-navigation/native';

import { useThemeSettings } from '../hooks/useThemeSettings';
import AppBarBottomNavigator from './AppBarBottom.navigator';
import LoadingScreen from '../screens/LoadingScreen';
import { useRestaurants } from '../hooks/useRestaurants';

const Navigation: React.FC = () => {
  const themeSettings = useThemeSettings();
  const { isLoading, restaurants } = useRestaurants();
  const navigationRef = useRef<NavigationContainerRef>(null);
  const [currentRouteName, setCurrentRouteName] = useState<string>();

  const updateRouteName = useCallback(() => {
    const routeName = navigationRef.current?.getCurrentRoute()?.name;

    if (routeName) {
      // console.log(`DEBUG: routeName=${routeName}`);
      setCurrentRouteName(routeName);
    }
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={themeSettings.isDarkMode ? DarkTheme : DefaultTheme}
      onStateChange={updateRouteName}>
      {!isLoading && restaurants.length > 0 ? (
        <AppBarBottomNavigator />
      ) : (
        <LoadingScreen />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
