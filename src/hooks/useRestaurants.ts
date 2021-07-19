import { useCallback, useEffect } from 'react';

import RestaurantService from '../services/RestaurantService';
import { useRestaurantsContext } from './useRestaurantsContext';
import { useCurrentLocation } from './useCurrentLocation';

const restaurantService = new RestaurantService();

export const useRestaurants = () => {
  const { currentLocation } = useCurrentLocation();
  const { restaurants, isLoading, setRestaurants, setIsLoading } =
    useRestaurantsContext();

  const getNearbyRestaurants = useCallback(
    async (latitude: number, longitude: number) => {
      setIsLoading(true);

      var results = await restaurantService.getNearbyPlaces(
        latitude,
        longitude,
        1500,
      );

      // console.log('DEBUG: getNearbyRestaurants', latitude, longitude, results);

      setRestaurants(results);
      setIsLoading(false);
    },
    [setIsLoading, setRestaurants],
  );

  // Fetch nearby places once we have region data
  useEffect(() => {
    if (!restaurants.length && !isLoading && !!currentLocation) {
      getNearbyRestaurants(currentLocation.latitude, currentLocation.longitude);
    }
  }, [currentLocation, getNearbyRestaurants, isLoading, restaurants.length]);

  // console.log('DEBUG: useRestaurants', {
  //   isLoading,
  //   restaurants: restaurants.length,
  // });

  return { restaurants, isLoading, getNearbyRestaurants };
};
