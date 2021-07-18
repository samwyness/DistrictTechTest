import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, View } from 'native-base';

import { useThemeSettings } from '../hooks/useThemeSettings';
import { useRestaurants } from '../hooks/useRestaurants';
import { Restaurant } from '../models/Restaurant';
import RestaurantCard from '../components/RestaurantCard';

const RestaurantsScreen = () => {
  const themeSettings = useThemeSettings();
  const { restaurants } = useRestaurants();

  return (
    <View flex={1} pt={20} backgroundColor={themeSettings.backgroundColor}>
      <FlatList
        contentContainerStyle={styles.verticalFlatList}
        data={restaurants}
        keyExtractor={item => (item as Restaurant).id}
        renderItem={(result: { item: Restaurant }) => (
          <RestaurantCard restaurant={result.item} />
        )}
      />
    </View>
  );
};

export default RestaurantsScreen;

const styles = StyleSheet.create({
  verticalFlatList: {
    padding: 20,
    paddingBottom: 100,
    justifyContent: 'space-between',
  },
});
