import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { StatusBar } from 'react-native';
import { themeConfig } from './constants/themeConfig';
import Navigation from './navigation';

const App = () => {
  return (
    <NativeBaseProvider theme={extendTheme(themeConfig)}>
      <StatusBar />
      <Navigation />
    </NativeBaseProvider>
  );
};

export default App;
