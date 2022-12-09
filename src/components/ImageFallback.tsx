import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

type ImageFallbackProps = {
  src: string;
  fallbackSrc: string;
  alt?: string;
  width?: number;
  height?: number;
} & ImageProps;

export function ImageFallback({ src, fallbackSrc, alt, width, height, ...rest }: ImageFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const onImageError = () => {
    setImgSrc(fallbackSrc)
  }

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      width={width}
      height={height}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          onImageError();
        }
      }}
      onError={() => onImageError()}
    />
  );
}