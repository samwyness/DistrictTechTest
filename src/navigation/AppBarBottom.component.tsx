import React from 'react';
import { Route } from '@react-navigation/core';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { HStack, Center, Text, Pressable } from 'native-base';
import Icon from 'react-native-vector-icons//MaterialIcons';

import { bottomTabs, findTabByName } from './config';
import { useCallback } from 'react';

const AppBarBottom: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const handleOnPress = useCallback(
    (route: Route<string>, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    },
    [navigation],
  );

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <HStack bg="brand.primary" safeArea={3}>
      {state.routes.map((route, index) => {
        const configItem = findTabByName(bottomTabs, route.name);
        const isFocused = state.index === index;

        if (!configItem) {
          return;
        }

        return (
          <Pressable
            key={index}
            flex={1}
            opacity={isFocused ? 1 : 0.5}
            onPress={() => handleOnPress(route, isFocused)}>
            <Center mb={2}>
              <Icon color="white" name={configItem.icon} size={24} />
              <Text color="white" fontSize={14} textAlign="center">
                {configItem?.label}
              </Text>
            </Center>
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default AppBarBottom;
