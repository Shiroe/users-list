import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

type ImageFallbackProps = {
  src: string;
  fallbackSrc: string;
} & ImageProps;

export function ImageFallback({ src, fallbackSrc, ...rest }: ImageFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      alt='avatar'
      src={imgSrc}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          setImgSrc(fallbackSrc);
        }
      }}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}