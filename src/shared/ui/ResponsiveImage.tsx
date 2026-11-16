import type { ImgHTMLAttributes } from 'react';
import { responsiveProps } from '../lib/responsive-image';

export function ResponsiveImage({ src, sizes, alt, ...props }: ImgHTMLAttributes<HTMLImageElement> & { alt: string }) {
  return <img {...responsiveProps(src, sizes)} {...props} src={src} alt={alt} />;
}
