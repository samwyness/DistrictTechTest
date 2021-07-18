import { GOOGLE_MAPS_API_KEY } from '../constants/keys';
import { Restaurant } from '../models/Restaurant';

export interface GooglePlaceResult {
  place_id: string;
  name: string;
  types: string[];
  rating: number;
  user_ratings_total: number;
  vicinity: string;
  formatted_phone_number?: string;
  website?: string;
  opening_hours: {
    open_now: boolean;
  };
  photos?: {
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
}

export type NearbyRestaurantsResponse = {
  results: GooglePlaceResult[];
};

export type RestaurantDetailResponse = {
  result: GooglePlaceResult;
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
      types: 'restaurant',
      location: `${latitude},${longitude}`,
      radius: `${radius}`,
      key: GOOGLE_MAPS_API_KEY,
    });

    try {
      const response = await fetch(baseUrl + searchParams);
      const json = (await response.json()) as NearbyRestaurantsResponse;

      return json.results.map(place => this.googlePlaceToRestaurant(place));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPlaceDetailsByReference(placeId: string): Promise<Restaurant> {
    const baseUrl = ' https://maps.googleapis.com/maps/api/place/details/json?';
    const searchParams = new URLSearchParams({
      place_id: placeId,
      fields:
        'place_id,name,vicinity,formatted_phone_number,website,rating,user_ratings_total,opening_hours,photos,geometry',
      key: GOOGLE_MAPS_API_KEY,
    });

    try {
      const response = await fetch(baseUrl + searchParams);
      const json = (await response.json()) as RestaurantDetailResponse;

      return this.googlePlaceToRestaurant(json.result);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPlacePhotoByReference(
    photoRef: string,
    maxWidth: string,
  ): Promise<string | null> {
    const baseUrl = ' https://maps.googleapis.com/maps/api/place/photo?';
    const searchParams = new URLSearchParams({
      photoreference: photoRef,
      maxwidth: maxWidth,
      key: GOOGLE_MAPS_API_KEY,
    });

    try {
      const response = await fetch(baseUrl + searchParams);
      return response.url;
    } catch (error) {
      throw new Error(error);
    }
  }

  private googlePlaceToRestaurant(place: GooglePlaceResult): Restaurant {
    return {
      id: place.place_id,
      name: place.name,
      types: place.types,
      isOpen: place.opening_hours?.open_now || false,
      rating: place.rating,
      totalRatings: place.user_ratings_total,
      address: place.vicinity,
      phoneNumber: place.formatted_phone_number || null,
      website: place.website || null,
      imageRef:
        place.photos && place.photos.length > 0
          ? place.photos[0].photo_reference
          : null,
      marker: {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      },
    };
  }
}
