export type Restaurant = {
  id: string;
  name: string;
  isOpen: boolean;
  rating: number;
  totalRatings: number;
  address: string;
  image: {
    src: string;
    width: number;
    height: number;
  } | null;
  marker: {
    latitude: number;
    longitude: number;
  };
};
