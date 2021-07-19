import axios, { AxiosInstance } from 'axios';

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
  apiService: AxiosInstance;

  constructor() {
    this.apiService = axios.create({
      baseURL: 'https://maps.googleapis.com/maps/api/place',
      headers: {},
    });
  }

  async getNearbyPlaces(
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<Restaurant[]> {
    const searchParams = new URLSearchParams({
      types: 'restaurant',
      location: `${latitude},${longitude}`,
      radius: `${radius}`,
      key: GOOGLE_MAPS_API_KEY,
    });

    try {
      const response = await this.apiService.get(
        `/nearbysearch/json?${searchParams}`,
      );
      const json = (await response.data) as NearbyRestaurantsResponse;

      return json.results.map(place => this.googlePlaceToRestaurant(place));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPlaceDetailsByReference(placeId: string): Promise<Restaurant> {
    const searchParams = new URLSearchParams({
      place_id: placeId,
      fields:
        'place_id,name,vicinity,formatted_phone_number,website,rating,user_ratings_total,opening_hours,photos,geometry',
      key: GOOGLE_MAPS_API_KEY,
    });

    try {
      const response = await this.apiService.get(
        `/details/json?${searchParams}`,
      );
      const json = (await response.data) as RestaurantDetailResponse;

      return this.googlePlaceToRestaurant(json.result);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPlacePhotoByReference(
    photoRef: string,
    maxWidth: string,
  ): Promise<string | null> {
    const searchParams = new URLSearchParams({
      photoreference: photoRef,
      maxwidth: maxWidth,
      key: GOOGLE_MAPS_API_KEY,
    });

    try {
      // TODO: investigate why network request sometimes fail when not in DEBUG mode
      const response = await this.apiService.get(`/photo?${searchParams}`, {
        headers: {
          'Access-Control-Expose-Headers': 'Location',
        },
      });

      return await response.request.responseURL;
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
