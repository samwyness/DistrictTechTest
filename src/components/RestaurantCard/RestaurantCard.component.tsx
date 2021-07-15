import React from 'react';
import { Box, Text } from 'native-base';
import { Restaurant } from '../../models/Restaurant';

type RestaurantCardProps = {
  restaurant: Restaurant;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Box px={5} py={2} rounded="md" my={2}>
      {/* TODO: Add restaurant image */}
      <Text textTransform="uppercase">{restaurant.name}</Text>
      <Text textDecoration="underline">{restaurant.address}</Text>

      {restaurant.rating && (
        <Text>{`${restaurant.rating} (${restaurant.totalRatings})`}</Text>
      )}

      {restaurant.isOpen && <Text>Open Now</Text>}
    </Box>
  );
};

export default RestaurantCard;
