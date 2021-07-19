import React from 'react';
import { Heading, Text, View } from 'native-base';

import { APP_NAME } from '../constants/app';
import { useThemeSettings } from '../hooks/useThemeSettings';

const LoadingScreen = () => {
  const themeSettings = useThemeSettings();

  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      bg={themeSettings.backgroundColor}>
      <Heading color={themeSettings.textColor} size="md" bold>
        {APP_NAME}
      </Heading>
      <Text color={themeSettings.textColor}>Loading</Text>
    </View>
  );
};
export default LoadingScreen;
