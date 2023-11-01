import { FC, ReactElement, useLayoutEffect, useState } from 'react';
import { ImageError } from '../image-error/ImageError';
import { ImageLoad } from '../image-load/ImageLoad';

interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}

export const Image: FC<IImageProps> = (props) => {
  const { className, src, alt = 'image', errorFallback, fallback, ...otherProps } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    const img = document.createElement('img');

    img.src = src ?? '';
    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (isLoading) {
    if (fallback) return fallback;
    return <ImageLoad {...otherProps} />;
  }

  if (hasError) {
    if (errorFallback) return errorFallback;
    return <ImageError {...otherProps} />;
  }

  return <img data-testid="image" className={className} src={src} alt={alt} {...otherProps} />;
};
