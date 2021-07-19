import React from 'react';
import { useWindowDimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, Heading, Link, Skeleton, Stack, Text, View } from 'native-base';

import { usePlaceDetails } from '../hooks/usePlaceDetails';
import { useThemeSettings } from '../hooks/useThemeSettings';
import { AppBottomBarParamList } from '../navigation/AppBarBottom.navigator';
import PlaceImage from '../components/PlaceImage';

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
  const { restaurantId } = route.params;
  const { placeDetails, isLoading } = usePlaceDetails(restaurantId);

  if (isLoading || placeDetails === null) {
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
          imageRef={placeDetails.imageRef}
          alt={placeDetails.name}
          width={width}
        />
      </Box>
      <Box p={4}>
        <Stack space={2}>
          <Heading color={themeSettings.textColor}>{placeDetails.name}</Heading>
          <Text color={themeSettings.textColor}>{placeDetails.address}</Text>
          <Text color={themeSettings.textColor}>
            {placeDetails.phoneNumber}
          </Text>
          {placeDetails.website && (
            <Link href={placeDetails.website}>
              <Text color={themeSettings.textColor}>Visit website</Text>
            </Link>
          )}
          <Text color={themeSettings.textColor}>{placeDetails.rating}</Text>
        </Stack>
      </Box>
    </View>
  );
};

export default RestaurantDetailScreen;
