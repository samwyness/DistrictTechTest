import React from 'react';
import { useWindowDimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, Heading, Link, Skeleton, Stack, Text, View } from 'native-base';

import { RootStackParamList } from '../navigation';
import { usePlaceDetails } from '../hooks/usePlaceDetails';
import PlaceImage from '../components/PlaceImage';

type RestaurantDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'RestaurantDetailScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'RestaurantDetailScreen'>;
};

const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({
  route,
}) => {
  const { width } = useWindowDimensions();
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
      <Box flexBasis="25%" bg="brand.light">
        <PlaceImage
          imageRef={placeDetails.imageRef}
          altText={placeDetails.name}
          width={width}
        />
      </Box>
      <Box p={4}>
        <Stack space={2}>
          <Heading>{placeDetails.name}</Heading>
          <Text color="gray.400">{placeDetails.address}</Text>
          <Text>{placeDetails.phoneNumber}</Text>
          {placeDetails.website && (
            <Link href={placeDetails.website}>Visit website</Link>
          )}
          <Text>{placeDetails.rating}</Text>
        </Stack>
      </Box>
    </View>
  );
};

export default RestaurantDetailScreen;
