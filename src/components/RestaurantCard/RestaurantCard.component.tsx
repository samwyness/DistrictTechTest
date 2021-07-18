import React, { useCallback } from 'react';
import { Box, Flex, Heading, Pressable, Stack, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { screens } from '../../config/navigation';
import { Restaurant } from '../../models/Restaurant';
import { cardStyles } from '../../styles/cardStyles';
import PlaceImage from '../PlaceImage';

type RestaurantCardProps = {
  restaurant: Restaurant;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const navigation = useNavigation();

  const handleOnPress = useCallback(() => {
    navigation.navigate(screens.RestaurantDetail.name, {
      restaurantId: restaurant.id,
    });
  }, [navigation, restaurant]);

  return (
    <Pressable onPress={handleOnPress}>
      <Flex
        style={cardStyles.cardShadow}
        direction="row"
        mb={4}
        p={3}
        bg="white"
        borderRadius={16}>
        <Box
          width={20}
          height={20}
          backgroundColor="brand.light"
          borderRadius={16}>
          {restaurant.imageRef && (
            <PlaceImage
              imageRef={restaurant.imageRef}
              altText={restaurant.name}
              width={160}
              borderRadius={16}
            />
          )}
        </Box>
        <Box flex={1} justifyContent="center">
          <Stack pl={4} pr={2} space={1}>
            <Heading size="md" bold>
              {restaurant.name}
            </Heading>
            <Text color="gray.400">{restaurant.address}</Text>
          </Stack>
        </Box>
      </Flex>
    </Pressable>
  );
};

export default RestaurantCard;
