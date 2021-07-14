export type Restaurant = {
  id: string;
  name: string;
  isOpen: boolean;
  rating: number;
  totalRatings: number;
  address: string;
  photos: {
    height: number;
    photo_reference: string;
    width: number;
  }[];
  marker: {
    latitude: number;
    longitude: number;
  };
};
