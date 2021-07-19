import React, { useCallback } from 'react';
import { Center, Box } from 'native-base';
import { LatLng, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import { RestaurantDetailScreenNavigationProp } from '../../screens/RestaurantDetailScreen';
import { useRef } from 'react';
import { useEffect } from 'react';

type MapMarkerProps = {
  coordinates: LatLng;
  title: string;
  restaurantId: string;
  isFocused?: boolean;
};

const MapMarker: React.FC<MapMarkerProps> = ({
  coordinates,
  title,
  restaurantId,
  isFocused = false,
}) => {
  const marker = useRef<Marker>(null);
  const navigation = useNavigation<RestaurantDetailScreenNavigationProp>();

  const handleOnPress = useCallback(() => {
    navigation.navigate('RestaurantDetail', {
      restaurantId: restaurantId,
    });
  }, [navigation, restaurantId]);

  useEffect(() => {
    if (isFocused) {
      marker.current?.showCallout();
    }
  }, [isFocused]);

  return (
    <Marker
      ref={marker}
      coordinate={coordinates}
      title={title}
      onCalloutPress={handleOnPress}>
      <Center>
        <Box
          width={6}
          height={6}
          backgroundColor="brand.opaque"
          borderRadius="full">
          <Box
            pos="absolute"
            top={1}
            left={1}
            width={4}
            height={4}
            backgroundColor="brand.primary"
            borderRadius="full"
          />
        </Box>
      </Center>
    </Marker>
  );
};
export default MapMarker;
