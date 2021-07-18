export type Restaurant = {
  id: string;
  name: string;
  types: string[];
  isOpen: boolean;
  rating: number;
  totalRatings: number;
  address: string;
  phoneNumber: string | null;
  website: string | null;
  imageRef: string | null;
  marker: {
    latitude: number;
    longitude: number;
  };
};
