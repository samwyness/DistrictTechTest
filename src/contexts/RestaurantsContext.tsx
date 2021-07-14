import React, { createContext, useState } from 'react';
import { Restaurant } from '../models/Restaurant';

export type RestaurantsProps = {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
};

const initialState = {
  restaurants: [],
  setRestaurants: () => {},
};

export const RestaurantsContext = createContext<RestaurantsProps>(initialState);

export const RestaurantsProvider: React.FC = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  return (
    <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
