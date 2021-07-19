import React, { useCallback } from 'react';
import { Linking, useWindowDimensions } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Pressable,
  Skeleton,
  Stack,
  Text,
  View,
} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { usePlaceDetails } from '../hooks/usePlaceDetails';
import { useThemeSettings } from '../hooks/useThemeSettings';
import { AppBottomBarParamList } from '../navigation/AppBarBottom.navigator';
import PlaceImage from '../components/PlaceImage';
import {} from 'react';

export type RestaurantDetailScreenNavigationProp = StackNavigationProp<
  AppBottomBarParamList,
  'RestaurantDetail'
>;

export type RestaurantDetailScreenProps = {
  route: RouteProp<AppBottomBarParamList, 'RestaurantDetail'>;
  navigation: RestaurantDetailScreenNavigationProp;
};

const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({
  route,
}) => {
  const { width } = useWindowDimensions();
  const themeSettings = useThemeSettings();
  const navigation = useNavigation();
  const { restaurantId } = route.params;
  const { placeDetails: restaurantData, isLoading } =
    usePlaceDetails(restaurantId);

  const navigateToRestaurantOnMap = useCallback(() => {
    restaurantData &&
      navigation.navigate('Map', {
        restaurantId: restaurantData.id,
      });
  }, [navigation, restaurantData]);

  const triggerPhoneCall = useCallback(() => {
    restaurantData?.phoneNumber &&
      Linking.openURL(`tel:${restaurantData.phoneNumber.replace(' ', '')}`);
  }, [restaurantData]);

  if (isLoading || restaurantData === null) {
    return (
      <View>
        <Skeleton flexBasis="25%" variant="rect" />
        <Box p={4}>
          <Stack space={2}>
            <Skeleton variant="text" height={12} />
            <Skeleton variant="text" height={6} />
            <Skeleton variant="text" height={6} />
          </Stack>
        </Box>
      </View>
    );
  }

  return (
    <View>
      <Box flexBasis="25%" bg="gray.200">
        <PlaceImage
          imageRef={restaurantData.imageRef}
          alt={restaurantData.name}
          width={width}
        />
      </Box>
      <Box p={4}>
        <Stack space={4}>
          <Flex direction="row">
            <Heading bold flex={1} color={themeSettings.textColor}>
              {restaurantData.name}
            </Heading>
            <Pressable width={8} height={8} mt={1} ml={1}>
              <Icon
                as={<MaterialIcon name={'star-outline'} />}
                size="md"
                color={'gray.300'}
              />
            </Pressable>
          </Flex>
          <Flex direction="row" alignItems="center">
            <Icon
              as={<MaterialIcon name="map-marker" />}
              size="sm"
              mr={4}
              color={'brand.light'}
            />
            <Pressable onPress={navigateToRestaurantOnMap}>
              <Text color={themeSettings.textColor}>
                {restaurantData.address}
              </Text>
            </Pressable>
          </Flex>
          <Flex direction="row" alignItems="center">
            <Icon
              as={<MaterialIcon name="phone" />}
              size="sm"
              mr={4}
              color={'brand.light'}
            />
            <Pressable onPress={triggerPhoneCall}>
              <Text color={themeSettings.textColor}>
                {restaurantData.phoneNumber}
              </Text>
            </Pressable>
          </Flex>
          <Flex direction="row" alignItems="center">
            <Icon
              as={<MaterialIcon name="web" />}
              size="sm"
              mr={4}
              color={'brand.light'}
            />
            {restaurantData.website && (
              <Link href={restaurantData.website}>
                <Text color={themeSettings.textColor}>Visit website</Text>
              </Link>
            )}
          </Flex>
        </Stack>
      </Box>
    </View>
  );
};

export default RestaurantDetailScreen;
