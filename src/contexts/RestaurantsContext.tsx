import React, { createContext, useState } from 'react';
import { Restaurant } from '../models/Restaurant';

export type RestaurantsProps = {
  restaurants: Restaurant[];
  favourites: string[];
  isLoading: boolean;
  setRestaurants: (restaurants: Restaurant[]) => void;
  setFavourites: (id: string[]) => void;
  setIsLoading: (value: boolean) => void;
};

const initialState: RestaurantsProps = {
  restaurants: [],
  favourites: [],
  isLoading: false,
  setRestaurants: () => {},
  setFavourites: () => {},
  setIsLoading: () => {},
};

export const RestaurantsContext = createContext<RestaurantsProps>(initialState);

export const RestaurantsProvider: React.FC = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        favourites,
        isLoading,
        setRestaurants,
        setFavourites,
        setIsLoading,
      }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
