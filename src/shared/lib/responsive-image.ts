import { imageSources } from '../assets/image-sources';

export function responsiveProps(src?: string, sizes = '(max-width: 767px) 100vw, 88vw') {
  const image = src ? imageSources[src] : undefined;
  return image ? { srcSet: image.srcSet, sizes, width: image.width, height: image.height } : {};
}
