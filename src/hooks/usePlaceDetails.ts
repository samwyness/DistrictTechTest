import { useCallback, useEffect, useState } from 'react';

import { Restaurant } from '../models/Restaurant';
import RestaurantService from '../services/RestaurantService';

const restaurantService = new RestaurantService();

export const usePlaceDetails = (placeId: Restaurant['id']) => {
  const [isLoading, setIsLoading] = useState(false);
  const [placeDetails, setPlaceDetails] = useState<Restaurant | null>(null);

  const getPlaceDetailsByRef = useCallback(async () => {
    setIsLoading(true);
    const response = await restaurantService.getPlaceDetailsByReference(
      placeId,
    );

    setPlaceDetails(response);
    setIsLoading(false);
  }, [placeId]);

  useEffect(() => {
    getPlaceDetailsByRef();
  }, [getPlaceDetailsByRef]);

  return {
    placeDetails,
    isLoading,
  };
};
