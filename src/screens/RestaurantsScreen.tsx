import React from 'react';
import { FlatList } from 'native-base';

import { useThemeSettings } from '../hooks/useThemeSettings';
import { useRestaurants } from '../hooks/useRestaurants';
import { Restaurant } from '../models/Restaurant';
import RestaurantCard from '../components/RestaurantCard';

const RestaurantsScreen = () => {
  const themeSettings = useThemeSettings();
  const { restaurants } = useRestaurants();

  return (
    <FlatList
      data={restaurants}
      backgroundColor={themeSettings.backgroundColor}
      keyExtractor={item => (item as Restaurant).id}
      renderItem={(result: { item: Restaurant }) => (
        <RestaurantCard restaurant={result.item} />
      )}
    />
  );
};

export default RestaurantsScreen;
