import React from 'react';
import { Route } from '@react-navigation/core';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Center, HStack, Pressable, View } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { bottomTabs, findTabByName } from '../config/navigation';
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
    <View
      position="absolute"
      bottom={0}
      alignItems="center"
      width="100%"
      mb={5}
      zIndex={10}>
      <HStack bg="brand.primary" p={0} borderRadius="full" shadow={2}>
        {state.routes.map((route, index) => {
          const configItem = findTabByName(bottomTabs, route.name);
          const isFocused = state.index === index;

          if (!configItem) {
            return;
          }

          return (
            <Pressable
              key={index}
              opacity={isFocused ? 1 : 0.5}
              borderRadius="full"
              overflow="hidden"
              onPress={() => handleOnPress(route, isFocused)}>
              <Center
                py={3}
                px={6}
                bg={isFocused ? 'rgba(255,255,255,0.2)' : ''}>
                <Icon color="white" name={configItem.icon} size={24} />
              </Center>
            </Pressable>
          );
        })}
      </HStack>
    </View>
  );
};

export default AppBarBottom;
