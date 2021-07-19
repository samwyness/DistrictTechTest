import React from 'react';
import { Image } from 'native-base';

import { Restaurant } from '../../models/Restaurant';
import { usePlacePhoto } from '../../hooks/usePlacePhoto';

type PlaceImageProps = {
  imageRef: Restaurant['imageRef'];
  alt: string;
  width: number;
  borderRadius?: number;
};

const PlaceImage: React.FC<PlaceImageProps> = ({
  imageRef,
  alt,
  width,
  borderRadius = 0,
}) => {
  const { imageUri } = usePlacePhoto(imageRef, width);

  return (
    <Image
      source={{
        uri: imageUri!,
      }}
      alt={alt}
      resizeMode="cover"
      size="full"
      borderRadius={borderRadius}
    />
  );
};
export default PlaceImage;
