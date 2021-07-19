import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';

import { themeConfig } from './config/themeConfig';
import { RestaurantsProvider } from './contexts/RestaurantsContext';
import Navigation from './navigation';

const App = () => {
  return (
    <RestaurantsProvider>
      <NativeBaseProvider theme={extendTheme(themeConfig)}>
        <StatusBar />
        <Navigation />
      </NativeBaseProvider>
    </RestaurantsProvider>
  );
};

export default App;
