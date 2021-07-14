import React from 'react';
import { Center, Box } from 'native-base';
import { LatLng, Marker } from 'react-native-maps';

type MapMarkerProps = {
  coordinates: LatLng;
  title: string;
};

const MapMarker: React.FC<MapMarkerProps> = ({ coordinates, title }) => {
  return (
    <Marker coordinate={coordinates} title={title}>
      <Center>
        <Box
          width={8}
          height={8}
          backgroundColor="brand.opaque"
          borderRadius="full">
          <Box
            pos="absolute"
            top={1}
            left={1}
            width={6}
            height={6}
            backgroundColor="brand.opaque"
            borderRadius="full"
          />
        </Box>
      </Center>
    </Marker>
  );
};
export default MapMarker;
