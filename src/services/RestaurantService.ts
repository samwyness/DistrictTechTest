import { GOOGLE_MAPS_API_KEY } from '../constants/keys';
import { Restaurant } from '../models/Restaurant';

export type GooglePlaceResult = {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  vicinity: string;
  opening_hours: {
    open_now: boolean;
  };
  photos: {
    height: number;
    photo_reference: string;
    width: number;
  }[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

export type NearbyRestaurantsResponse = {
  results: GooglePlaceResult[];
};

export default class RestaurantService {
  async getNearbyPlaces(
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<Restaurant[]> {
    const baseUrl =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

    const searchParams = new URLSearchParams({
      location: `${latitude},${longitude}&radius=${radius}`,
      types: 'restaurant',
      key: GOOGLE_MAPS_API_KEY,
    });

    try {
      const response = await fetch(baseUrl + searchParams);
      const json = (await response.json()) as NearbyRestaurantsResponse;

      return json.results.map(result => this.googlePlaceToRestaurant(result));
    } catch (error) {
      throw new Error(error);
    }
  }

  private googlePlaceToRestaurant(place: GooglePlaceResult): Restaurant {
    return {
      id: place.place_id,
      name: place.name,
      isOpen: place.opening_hours.open_now,
      rating: place.rating,
      totalRatings: place.user_ratings_total,
      address: place.vicinity,
      photos: place.photos,
      marker: {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      },
    };
  }
}
