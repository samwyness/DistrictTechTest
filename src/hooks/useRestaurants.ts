import { useCallback } from 'react';
import RestaurantService from '../services/RestaurantService';
import { useRestaurantsContext } from './useRestaurantsContext';

const restaurantService = new RestaurantService();

export const useRestaurants = () => {
  const { restaurants, setRestaurants } = useRestaurantsContext();

  const getNearbyRestaurants = useCallback(
    async (latitude: number, longitude: number) => {
      var results = await restaurantService.getNearbyPlaces(
        latitude,
        longitude,
        1500,
      );

      // console.log('DEBUG: getNearbyRestaurants', latitude, longitude, results);

      setRestaurants(results);
    },
    [setRestaurants],
  );

  return { restaurants, getNearbyRestaurants };
};
