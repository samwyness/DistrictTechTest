import { useCallback, useEffect, useState } from 'react';

import { Restaurant } from '../models/Restaurant';
import RestaurantService from '../services/RestaurantService';

const restaurantService = new RestaurantService();

export const usePlacePhoto = (
  imageRef: Restaurant['imageRef'],
  width: number,
) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const getImageByRef = useCallback(async () => {
    const response = await restaurantService.getPlacePhotoByReference(
      imageRef!,
      Math.ceil(width).toString(),
    );

    response && setImageUri(response);
  }, [imageRef, width]);

  useEffect(() => {
    getImageByRef();
  }, [getImageByRef]);

  return {
    imageUri,
  };
};
