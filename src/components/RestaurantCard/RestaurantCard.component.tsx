import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Pressable,
  Stack,
  Text,
  Icon,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Restaurant } from '../../models/Restaurant';
import { useThemeSettings } from '../../hooks/useThemeSettings';
import { MapScreenNavigationProp } from '../../screens/MapScreen';
import PlaceImage from '../PlaceImage';
import { cardStyles } from '../../styles/cardStyles';

type RestaurantCardProps = {
  restaurant: Restaurant;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const themeSettings = useThemeSettings();
  const navigation = useNavigation<MapScreenNavigationProp>();
  const [isChecked, setIsChecked] = useState(false);

  const navigateToRestaurantDetail = useCallback(() => {
    navigation.navigate('RestaurantDetail', {
      restaurantId: restaurant.id,
    });
  }, [navigation, restaurant]);

  const navigateToRestaurantOnMap = () => {
    navigation.navigate('Map', {
      restaurantId: restaurant.id,
    });
  };

  const toggleFavouriteRestaurant = useCallback(() => {
    setIsChecked(true);
  }, []);

  return (
    <Pressable onPress={navigateToRestaurantDetail}>
      <Flex
        style={cardStyles.cardShadow}
        direction="row"
        mb={4}
        p={3}
        bg={themeSettings.backgroundColor}
        borderRadius={16}>
        <Box
          width={20}
          height={20}
          backgroundColor="gray.200"
          borderRadius={16}>
          {restaurant.imageRef && (
            <PlaceImage
              imageRef={restaurant.imageRef}
              alt={restaurant.name}
              width={160}
              borderRadius={16}
            />
          )}
        </Box>
        <Box flex={1} justifyContent="center">
          <Stack pl={4} pr={2} space={1}>
            <Flex direction="row">
              <Heading
                size="md"
                bold
                flex={1}
                mt={0.5}
                color={themeSettings.textColor}>
                {restaurant.name}
              </Heading>
              <Pressable
                width={6}
                height={6}
                mt={1}
                ml={1}
                onPress={toggleFavouriteRestaurant}>
                <Icon
                  as={
                    <MaterialIcon name={isChecked ? 'star' : 'star-outline'} />
                  }
                  size="sm"
                  color={isChecked ? 'yellow.400' : 'gray.300'}
                />
              </Pressable>
            </Flex>
            <Text color="gray.400">{restaurant.address}</Text>
            <Stack direction="row" space={1}>
              <Button
                variant="unstyled"
                size="sm"
                mt={4}
                marginLeft="auto"
                onPress={navigateToRestaurantDetail}>
                More Info
              </Button>
              <Button
                variant="unstyled"
                size="sm"
                mt={4}
                onPress={navigateToRestaurantOnMap}>
                View on map
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </Pressable>
  );
};

export default RestaurantCard;
