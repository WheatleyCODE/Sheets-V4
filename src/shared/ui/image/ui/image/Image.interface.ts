import { ReactElement } from 'react';

export interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}
